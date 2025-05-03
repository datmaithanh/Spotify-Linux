from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Chat, Message, FriendRequest
from users.models import CustomUser
from .serializers import *


class UserSearchView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        query = self.request.query_params.get('search', '').strip()
        if not query:
            return CustomUser.objects.all().exclude(id=self.request.user.id)
        return CustomUser.objects.filter(username__icontains=query).exclude(id=self.request.user.id)


class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        friend_request = self.get_object()
        if friend_request.to_user != request.user:
            return Response({'error': 'Not allowed'}, status=403)
        friend_request.accepted = True
        friend_request.save()
        # Add each other as friends
        request.user.friends.add(friend_request.from_user)
        friend_request.from_user.friends.add(request.user)
        return Response({'status': 'Friend added'})

class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        chat = serializer.save()  
        chat.participants.add(self.request.user)

    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        chat = self.get_object()
        content = request.data.get('content')
        if not content:
            return Response({'error': 'Empty message'}, status=400)
        msg = Message.objects.create(chat=chat, sender=request.user, content=content)
        return Response(MessageSerializer(msg).data, status=201)

class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        chat_id = self.kwargs['chat_id']
        return Message.objects.filter(chat_id=chat_id)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def friend_list(request):
    user = request.user

    # Những lời mời do user gửi đã được chấp nhận
    sent_friends = FriendRequest.objects.filter(from_user=user, accepted=True).values_list('to_user', flat=True)

    # Những lời mời gửi đến user đã được chấp nhận
    received_friends = FriendRequest.objects.filter(to_user=user, accepted=True).values_list('from_user', flat=True)

    # Hợp nhất hai danh sách ID bạn bè
    all_friend_ids = list(sent_friends) + list(received_friends)

    friends = CustomUser.objects.filter(id__in=all_friend_ids)
    serializer = UserSerializer(friends, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def get_or_create_chat(request):
    user_id = request.data.get("userId")
    friend_id = request.data.get("friendId")

    if not user_id or not friend_id:
        return Response({"error": "Missing userId or friendId"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.get(id=user_id)
        friend = CustomUser.objects.get(id=friend_id)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # Tìm xem đã có chat giữa 2 người này chưa
    existing_chat = Chat.objects.filter(participants=user).filter(participants=friend).first()

    if existing_chat:
        return Response({"chat_id": existing_chat.id}, status=200)

    # Nếu chưa có, tạo mới
    chat = Chat.objects.create()
    chat.participants.set([user, friend])
    chat.save()

    return Response({"chat_id": chat.id}, status=201)