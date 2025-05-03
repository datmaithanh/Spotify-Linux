from rest_framework import viewsets
from .models import Artist, Album, Song, LikedSong, LikedArtist, LikedAlbum
from .serializers import ArtistSerializer, AlbumSerializer, SongSerializer, LikedSongSerializer, LikedArtistSerializer, LikedAlbumSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = []
    def get_queryset(self):
        artist_id = self.kwargs.get('pk')  
        if artist_id:
            return Artist.objects.filter(id= artist_id) 
        return Artist.objects.all()

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = []
    
    def get_queryset(self):
        album_id = self.kwargs.get('pk')  
        if album_id:
            return Album.objects.filter(id= album_id) 
        return Album.objects.all()

class SongViewSet(viewsets.ModelViewSet):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = []
    def get_queryset(self):
        song_id = self.kwargs.get('pk')  
        if song_id:
            return Song.objects.filter(id= song_id) 
        return Song.objects.all()

class LikedSongViewSet(viewsets.ModelViewSet):
    serializer_class = LikedSongSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LikedSong.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            # Thêm bài hát vào playlist của người dùng
            serializer.save(user=self.request.user)
        except IntegrityError:
            # Kiểm tra lỗi IntegrityError khi trùng lặp bài hát
            raise ValidationError("Bài hát đã có trong playlist của bạn!")


class LikedArtistViewSet(viewsets.ModelViewSet):
    serializer_class = LikedArtistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LikedArtist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            # Thêm bài hát vào playlist của người dùng
            serializer.save(user=self.request.user)
        except IntegrityError:
            # Kiểm tra lỗi IntegrityError khi trùng lặp bài hát
            raise ValidationError("Nghệ sĩ đã có trong list của bạn!")
        

class LikedAlbumViewSet(viewsets.ModelViewSet):
    serializer_class = LikedAlbumSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return LikedAlbum.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            raise ValidationError("Album đã được bạn yêu thích trước đó!")
