from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminUserRole
from .serializers import TrainSerializer
from .models import Train, SeatAvailability
from rest_framework.response import Response
import time
from analytics.mongo import logs_collection

class TrainCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def post(self, request):
        serializer = TrainSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class TrainSearchView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        source = request.GET.get('source')
        destination = request.GET.get('destination')
        date = request.GET.get('date')
        start = time.time()
        if not source or not destination:
            raise ValidationError('source and destination are required')
        if not date:
            raise ValidationError('date is required in YYYY-MM-DD format.')
        limit = int(request.GET.get("limit", 10))
        offset = int(request.GET.get("offset", 0))

        trains = Train.objects.filter(
            source=source,
            destination=destination
        )[offset:offset + limit]

        end = time.time()

        logs_collection.insert_one({
            "endpoint": "/api/trains/search/",
            "user_id": str(request.user.id),
            "params": request.GET.dict(),
            "execution_time_ms": (end - start) * 1000
        })

        result = []

        for train in trains:
            availability, _ = SeatAvailability.objects.get_or_create(
                train=train,
                journey_date=date
            )
            result.append({
                "train_id": train.id,
                "train_number": train.train_number,
                "name": train.name,
                "departure_time": train.departure_time,
                "arrival_time": train.arrival_time,
                "available_seats": availability.available_seats if availability else 0
            })

        return Response(result)