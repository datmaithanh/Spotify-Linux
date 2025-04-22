// src/components/ChangePasswordForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { changePassword } from "../apis/loginApi";

const ChangePasswordForm = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      changePassword(token, oldPassword, newPassword);

      setMessage("✅ Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setTimeout(onClose, 1500); 
    } catch (error) {
      setMessage("❌ Đổi mật khẩu thất bại. Kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="mt-6 p-6 bg-gray-800 rounded-lg text-white max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <input
          type="password"
          placeholder="Mật khẩu cũ"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-2 rounded"
        >
          Xác nhận
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ChangePasswordForm;
