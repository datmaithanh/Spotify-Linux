import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { detailUser, loginGoogle, loginUser } from "../apis/loginApi";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginUser(userName, password);

            localStorage.setItem("currentUser", userName);
            localStorage.setItem("accessToken", response.data.access);
            const detailU = await detailUser(response.data.access);
            localStorage.setItem("role", detailU.data.role);
            navigate("/");
        } catch (err) {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
            console.error(err);
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-[#121212] p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    🎧 Đăng nhập Spotify Clone
                </h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 rounded bg-[#1e1e1e] border border-[#333] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex items-center justify-between mt-4">
                        <a
                            href="/forgotpassword"
                            className="text-sm text-green-500"
                        >
                            Quên mật khẩu?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 transition-all py-2 rounded font-semibold mt-6"
                    >
                        Đăng nhập
                    </button>
                    <div className="mt-4 text-center">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const token = credentialResponse.credential;
                                    console.log("Google Token:", token);
                                    const result = await loginGoogle(token);

                                    // Lưu thông tin vào localStorage
                                    localStorage.setItem(
                                        "accessToken",
                                        result.access
                                    );
                                    localStorage.setItem(
                                        "refreshToken",
                                        result.refresh
                                    );
                                    localStorage.setItem(
                                        "currentUser",
                                        result.username
                                    );
                                    // Điều hướng về trang chủ
                                    navigate("/");
                                } catch (error) {
                                    console.error(
                                        "Google login failed:",
                                        error
                                    );
                                    setError("Đăng nhập Google thất bại.");
                                }
                            }}
                            onError={() => {
                                console.log("Google login thất bại");
                                setError("Đăng nhập Google thất bại.");
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-600 transition-all py-2 rounded font-semibold"
                        onClick={() => navigate("/register")}
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
