import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAlbum, getAllAlbum } from "../apis/albumApi";


const AlbumsAdmin = () => {
  const [albums, setAlbums] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await getAllAlbum();
        setAlbums(res);
      } catch (error) {
        console.error("Lỗi khi lấy album:", error);
      }
    };
    fetchAlbums();
  }, [accessToken]);

  const handleEdit = (albumId) => {
    console.log("Sửa album:", albumId);
    navigate(`/admin/albums/edit/${albumId}`);
  };

  const handleDelete = async (albumId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa album này?");
    if (confirmDelete) {
      try {
        await deleteAlbum(albumId);
        setAlbums((prev) => prev.filter((album) => album.id !== albumId));
        alert("Xóa album thành công!");
      } catch (error) {
        console.error("Lỗi khi xóa album:", error);
        alert("Xóa album thất bại!");
      }
    }
  };

  return (
    <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Danh sách Album</h1>
        <button
          onClick={() => navigate("/admin/albums/add")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Thêm Album
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">Tiêu đề</th>
            <th className="border-b p-2">Ảnh</th>
            <th className="border-b p-2">ID Nghệ sĩ</th>
            <th className="border-b p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {albums?.map((album) => (
            <tr key={album?.id}>
              <td className="border-b p-2">{album?.id}</td>
              <td className="border-b p-2">{album?.title}</td>
              <td className="border-b p-2">
                <img
                  src={album?.image}
                  alt={album?.title}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>
              <td className="border-b p-2">{album?.artist}</td>
              <td className="border-b p-2">
                <button
                  onClick={() => handleEdit(album.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(album.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {albums?.length === 0 && (
        <p className="text-center text-gray-400 mt-4">Không có album nào.</p>
      )}
    </div>
  );
};

export default AlbumsAdmin;
