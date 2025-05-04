from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'friend-requests', FriendRequestViewSet, basename='friend-request')
router.register(r'chats', ChatViewSet, basename='chat')

urlpatterns = [
    path('users/', UserSearchView.as_view(), name='user-search'),
    path('friends/', friend_list, name='friend-list'),
    path('chat/get-or-create/', get_or_create_chat, name='get_or_create_chat'),
    path('chats/<int:chat_id>/messages/', MessageListView.as_view(), name='chat-messages'),
    path('friend-requests/received/', received_friend_requests, name='received_friend_requests'),
    path('', include(router.urls)),
]
