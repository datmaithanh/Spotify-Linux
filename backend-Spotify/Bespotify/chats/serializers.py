from rest_framework import serializers
from .models import Chat, Message, FriendRequest
from users.models import CustomUser  # Đường dẫn tới model user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'avatar']

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True)
    to_user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'accepted', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'chat', 'sender', 'content', 'timestamp']

class ChatSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True, required=True)

    class Meta:
        model = Chat
        fields = ['id', 'participants', 'created_at']

    def create(self, validated_data):
        # Lấy danh sách participants từ dữ liệu gửi lên
        participants = validated_data.pop('participants', [])
        chat = Chat.objects.create(**validated_data)  # Tạo Chat nhưng chưa thêm participants
        chat.participants.set(participants)  # Gán participants (thay vì chat.participants.add)
        return chat
