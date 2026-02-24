from django.db import models
import uuid
from django.conf import settings
from trains.models import Train

class Booking(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    journey_date = models.DateField()
    seats_booked = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)