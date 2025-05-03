from django.db import models
from music.models import Artist 

# Create your models here.
class Video(models.Model):
    title = models.CharField(max_length=100)
    video_url = models.URLField(max_length=500, blank=True, null=True)
    image = models.URLField(max_length=500, blank=True, null=True)
    artist = models.ForeignKey(Artist, related_name='videos', on_delete=models.CASCADE) 

    def __str__(self):
        return self.title
