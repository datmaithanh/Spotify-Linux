import React, { useState } from "react";
import { toast } from "react-toastify";
import { resetOtpPassword, resetPassword } from "../apis/emailApi";  // Giả sử resetOtpPassword là API bạn đã tạo
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showResetForm, setShowResetForm] = useState(false);  // Biến trạng thái để hiển thị form reset mật khẩu
    const [otp, setOtp] = useState("");  // Để lưu OTP từ người dùng
    const [password, setPassword] = useState("");  // Để lưu mật khẩu mới
    const navigate = useNavigate();

    // Xử lý gửi yêu cầu OTP qua email
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Gửi yêu cầu email để reset mật khẩu
            await resetOtpPassword(email, setEmail ,setLoading);
            setShowResetForm(true);  // Hiển thị form reset mật khẩu khi gửi email thành công
           
        } catch (error) {
            toast.error(error || "Có lỗi xảy ra, vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    // Xử lý submit khi người dùng nhập OTP và mật khẩu mới
    const handleResetSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await resetPassword({email, otp, password, setEmail,setLoading,});
            setOtp("");        // Xóa OTP sau khi reset thành công
            setPassword("");   // Xóa mật khẩu sau khi reset thành công
            navigate("/login");
        } catch (error) {
            // Lỗi đã được toast trong hàm resetPassword nên có thể để trống hoặc log thêm nếu cần
            console.error("Reset password failed:", error);
        }
    };
    
    return (
        <div className="w-full h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-[#121212] p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    🔐 Quên mật khẩu
                </h2>

                {/* Form gửi email */}
                {!showResetForm && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Nhập email đã đăng ký"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 transition-all py-2 rounded font-semibold mt-6 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Đang gửi..." : "Gửi liên kết đặt lại mật khẩu"}
                        </button>
                    </form>
                )}

                {/* Form reset mật khẩu, chỉ hiển thị sau khi email gửi thành công */}
                {showResetForm && (
                    <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Nhập OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 transition-all py-2 rounded font-semibold mt-6 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
