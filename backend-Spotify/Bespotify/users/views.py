from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import get_user_model
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from .serializers import RegisterSerializer, UserSerializer, UserUpdateSerializer

User = get_user_model()

# View đăng ký người dùng mới
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Đăng ký thành công'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View lấy thông tin người dùng hiện tại
class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_vip': user.is_vip,
            'vip_expiry': user.vip_expiry,
            'role': user.role,
        })

# View thay đổi mật khẩu
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [JSONRenderer]  # Đảm bảo trả về JSON, tránh lỗi HTML

    def post(self, request):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not user.check_password(old_password):
            return Response({"error": "Mật khẩu cũ không đúng."}, status=status.HTTP_400_BAD_REQUEST)

        if old_password == new_password:
            return Response({"error": "Mật khẩu mới phải khác mật khẩu cũ."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        return Response({"message": "Đổi mật khẩu thành công."}, status=status.HTTP_200_OK)

# API đăng nhập qua Google
@api_view(['POST'])
def google_login(request):
    token = request.data.get("token")

    if token is None:
        return Response({"error": "No token provided"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Xác minh token với Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "192020305894-iucse0efj9ln05pf995i3et1352nk6j1.apps.googleusercontent.com")

        email = idinfo['email']
        name = idinfo.get('name', '')
        first_name = name.split()[0] if name else ''
        last_name = ' '.join(name.split()[1:]) if len(name.split()) > 1 else ''

        # Tìm hoặc tạo user
        user, created = User.objects.get_or_create(email=email, defaults={
            'username': email,
            'first_name': first_name,
            'last_name': last_name,
        })

        # Tạo JWT token
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
        })

    except ValueError as e:
        print(e)
        return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    
User = get_user_model()

class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs.get('pk')  
        if user_id:
            return User.objects.filter(id=user_id)
        return User.objects.all()

class UserUpdateAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAdminUser]  # Chỉ cho phép admin cập nhật thông tin người dùng


class UserDeleteAPIView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        if user == request.user:
            return Response({"detail": "Không thể tự xóa chính mình."}, status=400)
        return super().destroy(request, *args, **kwargs)
