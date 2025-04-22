from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from django.contrib.auth import get_user_model
from django.utils.crypto import get_random_string

from .models import EmailOTP
from .serializers import RequestChangeEmailSerializer, ConfirmChangeEmailSerializer

User = get_user_model()

class RequestChangeEmailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = RequestChangeEmailSerializer(data=request.data)
        if serializer.is_valid():
            new_email = serializer.validated_data["new_email"]

            
            otp = get_random_string(length=6, allowed_chars='0123456789')

            
            EmailOTP.objects.create(
                user=request.user,
                new_email=new_email,
                otp_code=otp
            )

            
            send_mail(
                subject="Xác nhận đổi email",
                message=f"Mã OTP để xác nhận email của bạn là: {otp}",
                from_email="no-reply@yourapp.com",
                recipient_list=[new_email],
                fail_silently=False
            )

            return Response({"message": "Đã gửi OTP tới email mới!"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConfirmChangeEmailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ConfirmChangeEmailSerializer(data=request.data)
        if serializer.is_valid():
            new_email = serializer.validated_data["new_email"]
            otp = serializer.validated_data["otp"]

            try:
                otp_record = EmailOTP.objects.filter(
                    user=request.user,
                    new_email=new_email,
                    otp_code=otp,
                    is_verified=False
                ).latest("created_at")

                # Cập nhật email
                request.user.email = new_email
                request.user.save()

                otp_record.is_verified = True
                otp_record.save()

                return Response({"message": "Cập nhật email thành công!"}, status=status.HTTP_200_OK)

            except EmailOTP.DoesNotExist:
                return Response({"error": "OTP không hợp lệ hoặc đã hết hạn."}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RequestResetPasswordOTPView(APIView):
    permission_classes = [] 

    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"email": "Trường email là bắt buộc."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"email": "Email không tồn tại trong hệ thống."}, status=status.HTTP_404_NOT_FOUND)

        # Tạo OTP ngẫu nhiên
        otp = get_random_string(length=6, allowed_chars='0123456789')

        # Lưu OTP vào DB (giống như RequestChangeEmailView)
        EmailOTP.objects.create(
            user=user,
            new_email=email,
            otp_code=otp
        )

        # Gửi OTP qua email
        send_mail(
            subject="Mã OTP đặt lại mật khẩu",
            message=f"Mã OTP để đặt lại mật khẩu của bạn là: {otp}",
            from_email="no-reply@yourapp.com",
            recipient_list=[email],
            fail_silently=False
        )

        return Response({"message": "OTP đã được gửi đến email!"}, status=status.HTTP_200_OK)
    
class VerifyResetPasswordOTPView(APIView):
    permission_classes = []  # ❌ Không cần đăng nhập

    def post(self, request):
        email = request.data.get("email")
        otp = request.data.get("otp")
        new_password = request.data.get("new_password")

        if not all([email, otp, new_password]):
            return Response({"detail": "Thiếu thông tin cần thiết."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"email": "Email không tồn tại."}, status=status.HTTP_404_NOT_FOUND)

        try:
            email_otp = EmailOTP.objects.filter(user=user, new_email=email).latest("created_at")
        except EmailOTP.DoesNotExist:
            return Response({"otp": "Không tìm thấy mã OTP."}, status=status.HTTP_404_NOT_FOUND)

        if email_otp.otp_code != otp:
            return Response({"otp": "Mã OTP không chính xác."}, status=status.HTTP_400_BAD_REQUEST)

        # Đặt lại mật khẩu
        user.set_password(new_password)
        user.save()

        # (Tuỳ chọn) Xoá OTP sau khi dùng
        email_otp.delete()

        return Response({"message": "Đặt lại mật khẩu thành công!"}, status=status.HTTP_200_OK)