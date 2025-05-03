import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAlbum } from "../apis/albumApi";
import { uploadImageToCloudinary, uploadMP3ToCloudinary } from "../apis/cloudinaryApi";
import { addSong } from "../apis/songApi";

const CreateSongAdmin = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [song, setSong] = useState({
    title: "",
    duration: "",
    audio_url: "",
    image: "",
    album_id: "", // album_id giữ giá trị chọn album
  });

  const [albumList, setAlbumList] = useState([]);
  const [error, setError] = useState(null);

  // Lấy danh sách album khi component được tải
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albumList = await getAllAlbum();
        setAlbumList(albumList);
      } catch (err) {
        console.error("Không thể tải danh sách album", err);
      }
    };
    fetchAlbums();
  }, []);

  // Hàm xử lý sự kiện thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setSong({
        ...song,
        [name]: files[0], // Cập nhật file khi chọn
      });
    } else {
      setSong({
        ...song,
        [name]: value, // Cập nhật giá trị thông thường
      });
    }
  };

  // Hàm xử lý gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Dữ liệu gửi lên sẽ được tạo từ state song
      const newSong = {
        ...song,
        duration: Number(song.duration), // Chuyển đổi duration thành số
        album_id: Number(song.album_id), // Chuyển đổi album_id thành số
      };

      // Tải MP3 lên Cloudinary
      const audioData = await uploadMP3ToCloudinary(song.audio_url);
      newSong.audio_url = audioData.secure_url;

      // Tải ảnh lên Cloudinary
      const imageData = await uploadImageToCloudinary(song.image);
      newSong.image = imageData.secure_url;

      console.log("Dữ liệu bài hát gửi lên:", newSong);

      // Gọi API để thêm bài hát mới
      await addSong(newSong, accessToken);

      // Thông báo thành công và điều hướng về trang danh sách bài hát
      alert("Thêm bài hát thành công!");
      navigate("/admin/songs");
    } catch (err) {
      setError("Không thể tạo bài hát mới");
      console.error(err);
    }
  };

  return (
    <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <h1 className="text-2xl font-bold mb-4">Tạo Bài Hát Mới</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tiêu đề bài hát */}
        <div>
          <label htmlFor="title" className="block mb-2">Tiêu đề bài hát</label>
          <input
            type="text"
            id="title"
            name="title"
            value={song.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        {/* Thời lượng bài hát */}
        <div>
          <label htmlFor="duration" className="block mb-2">Thời lượng (giây)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={song.duration}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        {/* File audio */}
        <div>
          <label htmlFor="audio_url" className="block mb-2">File Audio (MP3)</label>
          <input
            type="file"
            id="audio_url"
            name="audio_url"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            accept="audio/mp3"
            required
          />
        </div>

        {/* Ảnh bài hát */}
        <div>
          <label htmlFor="image" className="block mb-2">Ảnh bài hát</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            accept="image/*"
            required
          />
        </div>

        {/* Chọn album */}
        <div>
          <label htmlFor="album_id" className="block mb-2">Chọn Album</label>
          <select
            id="album_id"
            name="album_id" // Đảm bảo tên trùng với state
            value={song.album_id}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          >
            <option value="">-- Chọn Album --</option>
            {albumList.map((album) => (
              <option key={album.id} value={album.id}>
                (ID: {album.id}) {album.title}
              </option>
            ))}
          </select>
        </div>

        {/* Nút gửi */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Tạo mới
        </button>
      </form>
    </div>
  );
};

export default CreateSongAdmin;
