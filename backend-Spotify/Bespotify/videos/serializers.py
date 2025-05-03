from rest_framework import serializers
from .models import Video
from music.models import Artist  # Import model Artist từ ứng dụng music

# Serializer cho Artist
class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name', 'bio', 'image']  

# Serializer cho Video
class VideoSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all(), write_only=True)
    artist_detail = ArtistSerializer(source='artist', read_only=True)

    class Meta:
        model = Video
        fields = ['id', 'title', 'video_url', 'image', 'artist', 'artist_detail']
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance