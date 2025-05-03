import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserForAdmin } from '../apis/loginApi';

const CreateUserAdmin = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUserForAdmin(user);
      navigate('/admin/users'); // Sau khi tạo thành công, chuyển về trang danh sách users
    } catch (err) {
      setError('Không thể tạo người dùng mới');
      console.error(err);
    }
  };

  return (
    <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <h1 className="text-2xl font-bold mb-4">Tạo Người Dùng Mới</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
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
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
          Tạo mới
        </button>
      </form>
    </div>
  );
};

export default CreateUserAdmin;
