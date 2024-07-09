from django.contrib import admin
from .models import TimeRecord

@admin.register(TimeRecord)
class TimeRecordAdmin(admin.ModelAdmin):
    list_display = ('recorded_at',)
