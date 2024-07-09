from rest_framework import serializers
from .models import TimeRecord

class TimeRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeRecord
        fields = ['id', 'recorded_at']
