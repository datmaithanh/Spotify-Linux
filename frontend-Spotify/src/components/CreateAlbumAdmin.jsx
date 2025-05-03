import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../apis/cloudinaryApi";
import { getAllArtist } from "../apis/artistApi";
import { addAlbum } from "../apis/albumApi";


const CreateAlbumAdmin = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [album, setAlbum] = useState({
    title: "",
    artist: "",
    image: "",
  });

  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getAllArtist();
        setArtists(data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách nghệ sĩ:", err);
        setError("Không thể tải danh sách nghệ sĩ.");
      }
    };

    fetchArtists();
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setAlbum({
        ...album,
        [name]: files[0],
      });
    } else {
      setAlbum({
        ...album,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAlbum = { ...album };

      // Upload ảnh
      if (album.image) {
        const imageData = await uploadImageToCloudinary(album.image);
        newAlbum.image = imageData.secure_url;
      }
      
      newAlbum.release_date = new Date().toISOString().split("T")[0];

      console.log(newAlbum);

      await addAlbum(newAlbum, accessToken);
      alert("Tạo album thành công!");
      navigate("/admin/albums");
    } catch (err) {
      console.error("Lỗi khi tạo album:", err);
      setError("Không thể tạo album mới.");
    }
  };

  return (
    <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%]">
      <h1 className="text-2xl font-bold mb-4">Tạo Album Mới</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tiêu đề */}
        <div>
          <label htmlFor="title" className="block mb-2">Tiêu đề album</label>
          <input
            type="text"
            id="title"
            name="title"
            value={album.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        {/* Chọn nghệ sĩ */}
        <div>
          <label htmlFor="artist" className="block mb-2">Chọn nghệ sĩ</label>
          <select
            id="artist"
            name="artist"
            value={album.artist}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          >
            <option value="">-- Chọn nghệ sĩ --</option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ảnh album */}
        <div>
          <label htmlFor="image" className="block mb-2">Ảnh album</label>
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

        {/* Nút submit */}
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

export default CreateAlbumAdmin;
