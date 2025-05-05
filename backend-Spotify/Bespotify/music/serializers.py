from rest_framework import serializers
from .models import Artist, Album, Song, LikedSong, LikedArtist, LikedAlbum

class SongSerializer(serializers.ModelSerializer):
    album_name = serializers.CharField(source='album.title', read_only=True)
    artist_name = serializers.CharField(source='album.artist.name', read_only=True)
    album_id = serializers.IntegerField()

    class Meta:
        model = Song
        fields = ['id', 'title', 'duration', 'album_id', 'audio_url', 'image', 'album_name', 'artist_name']
        
    def create(self, validated_data):
        album_id = validated_data.pop('album_id')
        album = Album.objects.get(id=album_id)
        song = Song.objects.create(album=album, **validated_data)
        return song
    
    def update(self, instance, validated_data):
        album_id = validated_data.pop('album_id', None)
        if album_id:
            album_id = Album.objects.get(id=album_id)
            instance.album = album_id
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class AlbumSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = '__all__'
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class ArtistSerializer(serializers.ModelSerializer):
    albums = AlbumSerializer(many=True, read_only=True)

    class Meta:
        model = Artist
        fields = '__all__'

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

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


class LikedAlbumSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(read_only=True)
    album_id = serializers.PrimaryKeyRelatedField(
        queryset=Album.objects.all(), source='album', write_only=True
    )

    class Meta:
        model = LikedAlbum
        fields = ['id', 'album', 'album_id', 'liked_at']
