from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArtistViewSet, AlbumViewSet, SongViewSet, LikedSongViewSet, LikedArtistViewSet, LikedAlbumViewSet

router = DefaultRouter()
router.register(r'artists', ArtistViewSet)
router.register(r'albums', AlbumViewSet)
router.register(r'songs', SongViewSet)
router.register(r'liked-songs', LikedSongViewSet, basename='liked-songs')
router.register(r'liked-artists', LikedArtistViewSet, basename='liked-artists')
router.register(r'liked-albums', LikedAlbumViewSet, basename='liked-albums')



urlpatterns = [
    path('', include(router.urls)),
]
