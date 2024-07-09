# models.py

from django.db import models

class TimeRecord(models.Model):
    recorded_at = models.DateTimeField()
    # Other fields as needed
