from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_vip = models.BooleanField(default=False)
    vip_expiry = models.DateTimeField(null=True, blank=True)
    role = models.CharField(max_length=10, default='user', choices=[('user', 'User'), ('admin', 'Admin')])
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    def __str__(self):
        return self.username
