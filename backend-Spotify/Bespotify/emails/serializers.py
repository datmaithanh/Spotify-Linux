from rest_framework import serializers

class RequestChangeEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField()

class ConfirmChangeEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
class RequestResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerifyResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(min_length=8, write_only=True)