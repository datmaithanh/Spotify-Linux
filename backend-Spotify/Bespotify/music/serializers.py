from rest_framework import serializers
from .models import Artist, Album, Song, LikedSong, LikedArtist

class SongSerializer(serializers.ModelSerializer):
    album_name = serializers.CharField(source='album.title', read_only=True)
    artist_name = serializers.CharField(source='album.artist.name', read_only=True)

    class Meta:
        model = Song
        fields = ['id', 'title', 'duration', 'audio_url', 'image', 'album_name', 'artist_name']


class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = '__all__'

class ArtistSerializer(serializers.ModelSerializer):
    albums = AlbumSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = '__all__'

class LikedSongSerializer(serializers.ModelSerializer):
    song = SongSerializer(read_only=True)
    song_id = serializers.PrimaryKeyRelatedField(
        queryset=Song.objects.all(), source='song', write_only=True
    )

    class Meta:
        model = LikedSong
        fields = ['id', 'song', 'song_id', 'liked_at']

class LikedArtistSerializer(serializers.ModelSerializer):
    artist = ArtistSerializer(read_only=True)
    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(), source='artist', write_only=True
    )

    class Meta:
        model = LikedArtist
        fields = ['id', 'artist', 'artist_id', 'liked_at']