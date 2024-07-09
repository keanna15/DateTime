from rest_framework import generics
from .models import TimeRecord
from .serializer import TimeRecordSerializer

class TimeRecordListCreateView(generics.ListCreateAPIView):
    queryset = TimeRecord.objects.all()
    serializer_class = TimeRecordSerializer

class TimeRecordDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TimeRecord.objects.all()
    serializer_class = TimeRecordSerializer
