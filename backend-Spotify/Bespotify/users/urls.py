from django.urls import path
from .views import RegisterView, CurrentUserView,ChangePasswordView, google_login ,UserListAPIView , UserUpdateAPIView, UserDeleteAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', CurrentUserView.as_view(), name='current_user'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('auth/google-login/', google_login),
    path('users/', UserListAPIView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserListAPIView.as_view(), name='user-detail'),
    path('users/<int:pk>/update/', UserUpdateAPIView.as_view(), name='user-update'),
    path('users/<int:pk>/delete/', UserDeleteAPIView.as_view(), name='user-delete'),
    
]
