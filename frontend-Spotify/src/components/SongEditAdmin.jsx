import React, { act, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSongsById, updateSong } from "../apis/songApi";
import { getAllAlbum } from "../apis/albumApi";
import { GiConsoleController } from "react-icons/gi";
import { uploadImageToCloudinary, uploadMP3ToCloudinary } from "../apis/cloudinaryApi";

const SongEditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [song, setSong] = useState({
    title: "",
    duration: "",
    audio_url: "",
    image: "",
    album_id: "",
  });

  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [albumList, setAlbumList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch album list
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const albums = await getAllAlbum();
        console.log(albums);
        setAlbumList(albums);
      } catch (err) {
        console.error("Không thể tải danh sách album", err);
      }
    };
    fetchAlbums();
  }, []);

  // Fetch song data
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await getSongsById(id);
        console.log(response);
        setSong(response);
        setAudioPreview(response.audio_url);
        setImagePreview(response.image);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu bài hát");
        setLoading(false);
      }
    };
    fetchSong();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      if (name === "audio_url") {
        setAudioPreview(URL.createObjectURL(file));
      } else if (name === "image") {
        setImagePreview(URL.createObjectURL(file));
      }
      setSong((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setSong((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedSong = { ...song };
  
      // Upload audio nếu là File
      if (song.audio_url instanceof File) {
        const audioUrl = await uploadMP3ToCloudinary(song.audio_url, "audio");
        updatedSong.audio_url = audioUrl.secure_url;
      }
  
      // Upload image nếu là File
      if (song.image instanceof File) {
        const imageUrl = await uploadImageToCloudinary(song.image);
        updatedSong.image = imageUrl.secure_url;
      }

      console.log(updatedSong);
  
      await updateSong(id, updatedSong, accessToken);
      navigate("/admin/songs");
  
    } catch (err) {
      setError("Không thể cập nhật thông tin bài hát");
    }
  };
  

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Bài Hát</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tiêu đề bài hát */}
        <div>
          <label htmlFor="title" className="block mb-2">
            Tiêu đề bài hát
          </label>
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

        {/* Thời lượng */}
        <div>
          <label htmlFor="duration" className="block mb-2">
            Thời lượng (giây)
          </label>
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

        {/* File Audio */}
        <div>
          <label htmlFor="audio_url" className="block mb-2">
            File Audio (MP3)
          </label>
          {audioPreview && (
            <audio controls className="mb-2 w-full">
              <source src={audioPreview} type="audio/mp3" />
              Trình duyệt của bạn không hỗ trợ phát âm thanh.
            </audio>
          )}
          <input
            type="file"
            id="audio_url"
            name="audio_url"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            accept="audio/mp3"
          />
        </div>

        {/* Ảnh bài hát */}
        <div>
          <label htmlFor="image" className="block mb-2">
            Ảnh bài hát
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Ảnh bài hát"
              className="w-32 h-32 mb-2 object-cover rounded"
            />
          )}
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            accept="image/*"
          />
        </div>

        {/* Chọn Album */}
        <div>
          <label htmlFor="album_id" className="block mb-2">
            Chọn Album
          </label>
          <select
            id="album_id"
            name="album_id"
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

        {/* Nút Cập nhật */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default SongEditAdmin;
