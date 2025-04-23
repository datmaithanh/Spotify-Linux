import axios from "axios";


import { toast } from "react-toastify";

export async function handleSendOtp(newEmail, accessToken, setIsWaitingOtp, setIsLoadingSendOtp) {
    try {
        setIsLoadingSendOtp(true);
        const res = await axios.post("http://127.0.0.1:8000/api/emails/request-change-email/",
            { new_email: newEmail },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        toast.success("Đã gửi OTP đến email mới");
        setIsWaitingOtp(true);
    } catch (err) {
        toast.error("Không thể gửi OTP: " + (err.response?.data?.message || err.message));
    } finally {
        setIsLoadingSendOtp(false);
    }
}



export async function handleVerifyOtp(newEmail, otp, accessToken, setDetailUserData, setIsEditingEmail, setIsWaitingOtp, setNewEmail, setOtp) {
    try {
        const res = await axios.post("http://127.0.0.1:8000/api/emails/confirm-change-email/",
            { new_email: newEmail, otp: otp },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        toast.success("Đổi email thành công!");

        
        setDetailUserData((prev) => ({
            ...prev,
            email: newEmail,
        }));
        setIsEditingEmail(false);
        setIsWaitingOtp(false);
        setNewEmail("");
        setOtp("");
    } catch (err) {
        toast.error("Xác minh OTP thất bại: " + (err.response?.data?.message || err.message));
    }
}


export const resetOtpPassword = async (email, setEmail, setLoading) => {
    setLoading(true);  // Bắt đầu quá trình

    try {
        await axios.post("http://127.0.0.1:8000/api/emails/request-reset-password/", {
            email: email,
        });

        toast.success("Đã gửi liên kết đặt lại mật khẩu đến email của bạn!");
        
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Gửi email thất bại. Vui lòng thử lại."
        );
    } finally {
        setLoading(false);  // Đảm bảo setLoading(false) sau khi hoàn tất
    }
};

export const resetPassword = async ({ email, otp, password, setEmail, setLoading }) => {
    setLoading(true); // Bắt đầu quá trình
    console.log("email", email);
    console.log("otp", otp);
    console.log("password", password);
    try {
        await axios.post("http://127.0.0.1:8000/api/emails/verify-reset-password-otp/", {
            email: email,
            otp: otp,
            new_password: password,
        });
        
        toast.success("Mật khẩu đã được đặt lại thành công!");
        setEmail(""); // Xóa email sau khi hoàn tất
        
    } catch (error) {
        toast.error(
            error.response?.data?.message || "Đổi mật khẩu thất bại. Vui lòng thử lại."
        );
    } finally {
        setLoading(false); // Kết thúc quá trình
    }
};
