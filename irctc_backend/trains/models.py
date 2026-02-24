from django.db import models
import uuid

class Train(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    train_number = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    source = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.TimeField()
    arrival_time = models.TimeField()
    total_seats = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.train_number

class SeatAvailability(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    train = models.ForeignKey(Train, on_delete=models.CASCADE)
    journey_date = models.DateField()
    available_seats = models.IntegerField(blank=True, null=True)

    class Meta:
        unique_together = ['train', 'journey_date']

    def save(self, *args, **kwargs):
        if self.available_seats is None:
            self.available_seats = self.train.total_seats
        super().save(*args, **kwargs)