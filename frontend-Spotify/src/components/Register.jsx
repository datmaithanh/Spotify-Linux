import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { registerUser } from "../apis/loginApi";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }

        try {
            await registerUser(username, email, password);
            setSuccess("Đăng ký thành công! Đang chuyển hướng...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            console.error(err);
            setError("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-[#121212] p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    ✍️ Đăng ký Spotify Clone
                </h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}

                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 transition-all py-2 rounded font-semibold mt-4"
                    >
                        Đăng ký
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="bg-gray-500 hover:bg-gray-600 transition-all py-2 rounded font-semibold"
                    >
                        Quay lại đăng nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
