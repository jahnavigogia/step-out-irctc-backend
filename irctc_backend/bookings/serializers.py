from rest_framework import serializers
from .models import Booking

class BookingSerializer(serializers.ModelSerializer):
    train_number = serializers.CharField(source="train.train_number", read_only=True)
    train_name = serializers.CharField(source="train.name", read_only=True)

    class Meta:
        model = Booking
        fields = [
            "id",
            "train_number",
            "train_name",
            "journey_date",
            "seats_booked",
            "created_at"
        ]