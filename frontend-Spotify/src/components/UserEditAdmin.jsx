import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import { editUserById, getUserById } from '../apis/loginApi'; 

const UserEditAdmin = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate(); // Khai báo useNavigate để điều hướng

  const [user, setUser] = useState({
    username: '',
    email: '',
    role: 'user',
    is_vip: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id, accessToken);
        setUser(response[0]); // Gán dữ liệu trả về vào state user
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu người dùng');
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUserById(id, user, accessToken); // Cập nhật user
      navigate('/admin/users'); // Quay lại danh sách user sau khi sửa xong
    } catch (err) {
      setError('Không thể cập nhật thông tin người dùng');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value, 
    });
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Người Dùng</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user?.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user?.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="role" className="block mb-2">Role</label>
          <select
            id="role"
            name="role"
            value={user?.role}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="is_vip" className="block mb-2">VIP</label>
          <input
            type="checkbox"
            id="is_vip"
            name="is_vip"
            checked={user?.is_vip}
            onChange={handleChange}
            className="w-4 h-4"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UserEditAdmin;
