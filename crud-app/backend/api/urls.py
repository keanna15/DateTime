from django.urls import path
from .views import TimeRecordDetailView, TimeRecordListCreateView

urlpatterns = [
    path('time-records/', TimeRecordListCreateView.as_view(), name="time-record-list-create"),
    path('time-records/<int:pk>/', TimeRecordDetailView.as_view(), name="time-record-detail"),
]
