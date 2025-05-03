import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import { useLocation } from "react-router-dom";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import SidebarAdmin from "./components/SidebarAdmin";
import DisplayAdmin from "./components/DisplayAdmin";

const App = () => {
    const { audioRef, track } = useContext(PlayerContext);

    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";
    const isForgotPasswordPage = location.pathname === "/forgotpassword";
    const isAdminPage = location.pathname.startsWith("/admin");
    const isVideoPage = location.pathname.startsWith("/video");


    // Nếu là trang login
    if (isRegisterPage)
        return (
            <>
                <Register />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    theme="dark"
                />
            </>
        );
    if (isLoginPage)
        return (
            <>
                <Login />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    theme="dark"
                />
            </>
        );

    // Nếu là trang quên mật khẩu
    if (isForgotPasswordPage)
        return (
            <>
                <ForgotPassword />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    theme="dark"
                />
            </>
        );

    if (isAdminPage)
        return (
            <div className="h-screen bg-black">
                <div className="w-full h-[10%] bg-[#121212] flex items-center justify-between px-4">
                    <Navbar />
                </div>
                <div className="flex ">
                    <SidebarAdmin/>
                    <DisplayAdmin />
                </div>
            </div>
        );
    
    // Nếu là trang video
    if(isVideoPage)
        return (
            <div className="h-screen bg-black">
            <div className="w-full h-[10%] bg-[#121212] flex items-center justify-between px-4">
                <Navbar />
            </div>
            <div className="h-[80%] flex">
                <Sidebar />
                <Display />
            </div>
            

            {track && track.audio_url && (
                <audio ref={audioRef} src={track.audio_url} preload="auto" />
            )}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
        );

    // Các trang còn lại
    return (
        <div className="h-screen bg-black">
            <div className="w-full h-[10%] bg-[#121212] flex items-center justify-between px-4">
                <Navbar />
            </div>
            <div className="h-[80%] flex">
                <Sidebar />
                <Display />
            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 h-[10%] bg-[#121212] flex items-center justify-between px-4">
                <Player />
            </div>

            {track && track.audio_url && (
                <audio ref={audioRef} src={track.audio_url} preload="auto" />
            )}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default App;
