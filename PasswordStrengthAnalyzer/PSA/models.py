from django.db import models

# Create your models here.
class CommonPassword(models.Model):
    password = models.CharField(max_length=255)

class PasswordAnalytics(models.Model):
    total_passwords_analyzed = models.IntegerField(default=0)
    average_length = models.FloatField()
    average_entropy = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)