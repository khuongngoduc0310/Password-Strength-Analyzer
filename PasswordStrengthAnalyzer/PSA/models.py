from django.db import models

# Create your models here.
class Common_Passwords(models.Model):
    content = models.TextField()

    def __str__(self):
            return self.content      

# class PasswordAnalytics(models.Model):
#     total_passwords_analyzed = models.IntegerField(default=0)
#     average_length = models.FloatField()
#     average_entropy = models.FloatField()
#     created_at = models.DateTimeField(auto_now_add=True)