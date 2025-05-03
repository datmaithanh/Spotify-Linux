# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from users.models import CustomUser
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.chat_id}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message', '')
        sender_info = data.get('sender', {}) 
        sender_id = sender_info.get('sender_id', None)
        sender_username = sender_info.get('sender_username', '')

        # Lưu vào database
        await self.save_message(sender_id, self.chat_id, message)

        # Gửi tới nhóm WebSocket
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': {
                    'id': sender_id,
                    'username': sender_username
                }
            }
        )

    async def chat_message(self, event):
        message = event.get('message', '')
        sender = event.get('sender', {})

        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))

    @sync_to_async
    def save_message(self, sender_id, chat_id, content):
        from .models import Chat, Message
        try:
            chat = Chat.objects.get(id=chat_id)
            sender = CustomUser.objects.get(id=sender_id)
            Message.objects.create(chat=chat, sender=sender, content=content)
        except Exception as e:
            print("Error saving message:", e)
