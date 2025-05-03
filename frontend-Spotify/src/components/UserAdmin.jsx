import React, { useEffect, useState } from "react";
import { deleteUserById, getAllUser } from "../apis/loginApi";
import { useNavigate } from "react-router-dom";

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUser(accessToken);
                setUsers(data.data);
            } catch (error) {
                console.error("Lỗi khi lấy users:", error);
            }
        };
        fetchUsers();
    }, [accessToken]);

    const handleEdit = (userId) => {
        console.log("Sửa user:", userId);
        // Chuyển hướng đến trang sửa user
        navigate(`/admin/users/edit/${userId}`);
    };

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa user này?"
        );
        if (confirmDelete) {
            try {
                await deleteUserById(userId, accessToken);
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== userId)
                );
                alert("Xóa user thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa user:", error);
                alert("Xóa user thất bại!");
            }
        }
    };

    return (
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Danh sách User</h1>
                <button
                    onClick={() => navigate("/admin/users/add")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Thêm User
                </button>
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">ID</th>
                        <th className="border-b p-2">Username</th>
                        <th className="border-b p-2">Email</th>
                        <th className="border-b p-2">Role</th>
                        <th className="border-b p-2">VIP</th>
                        <th className="border-b p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user?.id}>
                            <td className="border-b p-2">{user?.id}</td>
                            <td className="border-b p-2">{user?.username}</td>
                            <td className="border-b p-2">{user?.email}</td>
                            <td className="border-b p-2">{user?.role}</td>
                            <td className="border-b p-2">
                                {user?.is_vip ? "Có" : "Không"}
                            </td>
                            <td className="border-b p-2 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(user.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {users?.length === 0 && (
                <p className="text-center text-gray-400 mt-4">
                    Không có user nào.
                </p>
            )}
        </div>
    );
};

export default UserAdmin;
