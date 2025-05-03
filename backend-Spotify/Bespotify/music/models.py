from django.db import models
from django.conf import settings

class Artist(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField(max_length=500, blank=True, null=True) 
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, related_name='albums', on_delete=models.CASCADE)
    release_date = models.DateField()
    image = models.URLField(max_length=500, blank=True, null=True) 

    def __str__(self):
        return self.title

class Song(models.Model):
    title = models.CharField(max_length=100)
    album = models.ForeignKey(Album, related_name='songs', on_delete=models.CASCADE)
    duration = models.IntegerField(help_text="Thời lượng (giây)")
    audio_url = models.URLField(max_length=500, blank=True, null=True)
    image = models.URLField(max_length=500, blank=True, null=True) 


    def __str__(self):
        return self.title
    
class LikedSong(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='liked_songs', on_delete=models.CASCADE)
    song = models.ForeignKey(Song, related_name='liked_by_users', on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'song')  # Mỗi user chỉ được thích một bài một lần

    def __str__(self):
        return f"{self.user.username} liked {self.song.title}"
    
class LikedArtist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='liked_artists', on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, related_name='liked_by_users', on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'artist')

    def __str__(self):
        return f"{self.user.username} liked {self.song.title}"

class LikedAlbum(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='liked_albums', on_delete=models.CASCADE)
    album = models.ForeignKey(Album, related_name='liked_by_users', on_delete=models.CASCADE)
    liked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'album')

    def __str__(self):
        return f"{self.user.username} liked {self.album.title}"
