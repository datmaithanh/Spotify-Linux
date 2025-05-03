import os
import django

# Đảm bảo gọi django.setup() trước khi làm việc với Django models
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Bespotify.settings')
django.setup()

# Sau khi gọi django.setup(), giờ mới import các phần khác của Django
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import chats.routing

# Khởi tạo ứng dụng ASGI
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chats.routing.websocket_urlpatterns
        )
    ),
})
