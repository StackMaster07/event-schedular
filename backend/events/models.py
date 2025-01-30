from datetime import timedelta, datetime

from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Event(models.Model):
    REPEAT_CHOICES = [('NONE', 'None'), ('WEEKLY', 'Weekly')]

    name = models.CharField(max_length=200)
    start_time = models.TimeField()
    end_time = models.TimeField()
    start_date = models.DateField()
    repeat = models.CharField(max_length=10, choices=REPEAT_CHOICES, default='NONE')
    repeat_days = models.CharField(max_length=100, blank=True, null=True)
    user = models.ForeignKey(User, related_name='events', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    @property
    def duration(self):
        ''' Calculate the duration based on start_time and end_time '''
        start_datetime = datetime.combine(self.start_date, self.start_time)
        end_datetime = datetime.combine(self.start_date, self.end_time)
        
        # If end_time is earlier than start_time, assume the event ends the next day
        if end_datetime < start_datetime:
            end_datetime += timedelta(days=1)

        # Calculate the duration
        return end_datetime - start_datetime
