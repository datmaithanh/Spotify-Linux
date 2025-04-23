from django.urls import path
from .views import RequestChangeEmailView, ConfirmChangeEmailView, RequestResetPasswordOTPView,VerifyResetPasswordOTPView

urlpatterns = [
    path("request-change-email/", RequestChangeEmailView.as_view(), name="request-change-email"),
    path("confirm-change-email/", ConfirmChangeEmailView.as_view(), name="confirm-change-email"),
    path('request-reset-password/', RequestResetPasswordOTPView.as_view(), name='request-reset-password'),
    path('verify-reset-password-otp/', VerifyResetPasswordOTPView.as_view(), name='verify_reset_password_otp'),
]
