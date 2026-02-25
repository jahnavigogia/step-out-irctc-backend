from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from datetime import datetime
from trains.models import SeatAvailability
from .models import Booking
from .serializers import BookingSerializer


class BookSeatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        train_id = request.data.get('train_id')
        journey_date = request.data.get('date')
        seats = int(request.data.get('seats'))

        journey_date = datetime.strptime(journey_date, "%Y-%m-%d").date()

        try:
            with transaction.atomic():
                availability, _ = SeatAvailability.objects.select_for_update().get_or_create(
                    train_id=train_id,
                    journey_date=journey_date
                )

                if availability.available_seats < seats:
                    return Response({"error": "Not enough seats"}, status=status.HTTP_400_BAD_REQUEST)

                availability.available_seats -= seats
                availability.save()

                booking = Booking.objects.create(
                    user=request.user,
                    train_id=train_id,
                    journey_date=journey_date,
                    seats_booked=seats
                )

                return Response({
                    "message": "Booking successful",
                    "booking_id": booking.id
                })

        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class ViewBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.filter(user=request.user).order_by('-created_at')
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)