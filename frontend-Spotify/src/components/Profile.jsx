import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { detailUser } from "../apis/loginApi";
import ChangePasswordForm from "./ChangePasswordForm";
import { handleSendOtp, handleVerifyOtp } from "../apis/emailApi";
import { CiEdit } from "react-icons/ci";

const Profile = () => {
    const username = localStorage.getItem("currentUser");
    const accessToken = localStorage.getItem("accessToken");
    const [detailUserData, setDetailUserData] = useState(null);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isWaitingOtp, setIsWaitingOtp] = useState(false);
    const [isLoadingSendOtp, setIsLoadingSendOtp] = useState(false);

    useEffect(() => {
        if (!accessToken) {
            alert("Bạn chưa đăng nhập!");
            window.location.href = "/login";
            return;
        }

        const fetchUserDetail = async () => {
            try {
                const response = await detailUser(accessToken);
                setDetailUserData(response.data);
                console.log("User detail:", response.data);
            } catch (error) {
                alert(
                    "Lỗi khi lấy thông tin người dùng. Vui lòng đăng nhập lại!"
                );
                window.location.href = "/login";
            }
        };

        fetchUserDetail();
    }, [accessToken]);

    return (
        <div className="text-white min-h-screen bg-black">

            <div className="px-8 py-10">
                {detailUserData && (
                    <div className="bg-[#121212] p-8 rounded-xl shadow-md w-full max-w-4xl mx-auto text-white">
                        <h1 className="text-3xl font-bold mb-6 text-center">
                            Thông tin cá nhân
                        </h1>

                        <div className="space-y-4">
                            <p className="text-lg">
                                <span className="font-semibold">
                                    Tên người dùng:
                                </span>{" "}
                                {username}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold">Email:</span>{" "}
                                {detailUserData.email}
                                <button
                                    onClick={() =>
                                        setIsEditingEmail(!isEditingEmail)
                                    }
                                    className="ml-2 text-blue-400 underline cursor-pointer"
                                >
                                    {<CiEdit />}
                                </button>
                            </p>

                            {isEditingEmail && (
                                <div className="mt-4 space-y-3">
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) =>
                                            setNewEmail(e.target.value)
                                        }
                                        placeholder="Nhập email mới"
                                        className="p-2 rounded text-white w-full"
                                    />
                                    {!isWaitingOtp ? (
                                        <button
                                            onClick={() =>
                                                handleSendOtp(
                                                    newEmail,
                                                    accessToken,
                                                    setIsWaitingOtp,
                                                    setIsLoadingSendOtp
                                                )
                                            }
                                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white flex items-center justify-center"
                                            disabled={isLoadingSendOtp}
                                        >
                                            {isLoadingSendOtp ? (
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8H4z"
                                                    ></path>
                                                </svg>
                                            ) : null}
                                            {isLoadingSendOtp
                                                ? "Đang gửi..."
                                                : "Gửi mã OTP"}
                                        </button>
                                    ) : (
                                        // phần nhập OTP vẫn giữ nguyên

                                        <>
                                            <input
                                                type="text"
                                                value={otp}
                                                onChange={(e) =>
                                                    setOtp(e.target.value)
                                                }
                                                placeholder="Nhập OTP"
                                                className="p-2 rounded text-white w-full"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleVerifyOtp(
                                                        newEmail,
                                                        otp,
                                                        accessToken,
                                                        setDetailUserData,
                                                        setIsEditingEmail,
                                                        setIsWaitingOtp,
                                                        setNewEmail,
                                                        setOtp
                                                    )
                                                }
                                                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white"
                                            >
                                                Xác nhận đổi email
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                            <p className="text-lg">
                                <span className="font-semibold">VIP:</span>{" "}
                                {detailUserData.is_vip ? "⭐VIP" : "NO VIP"}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() =>
                                    setShowChangePasswordForm(
                                        !showChangePasswordForm
                                    )
                                }
                                className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded text-black font-semibold"
                            >
                                Đổi mật khẩu
                            </button>
                        </div>

                        {showChangePasswordForm && (
                            <ChangePasswordForm
                                onClose={() => setShowChangePasswordForm(false)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
