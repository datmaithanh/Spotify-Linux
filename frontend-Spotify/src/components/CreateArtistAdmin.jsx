import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../apis/cloudinaryApi";
import { addArtist } from "../apis/artistApi";

const CreateArtistAdmin = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [artist, setArtist] = useState({
    name: "",
    bio: "",
    image: null,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setArtist({
        ...artist,
        [name]: files[0],
      });
    } else {
      setArtist({
        ...artist,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newArtist = { ...artist };

      // Upload ảnh lên Cloudinary nếu có
      if (artist.image) {
        const imageData = await uploadImageToCloudinary(artist.image);
        newArtist.image = imageData.secure_url;
      }

      // Gọi API thêm artist
      await addArtist(newArtist, accessToken);

      alert("Thêm nghệ sĩ thành công!");
      navigate("/admin/artists");
    } catch (err) {
      console.error("Lỗi khi tạo nghệ sĩ:", err);
      setError("Không thể tạo nghệ sĩ mới.");
    }
  };

  return (
    <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%]">
      <h1 className="text-2xl font-bold mb-4">Tạo Nghệ Sĩ Mới</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên nghệ sĩ */}
        <div>
          <label htmlFor="name" className="block mb-2">Tên nghệ sĩ</label>
          <input
            type="text"
            id="name"
            name="name"
            value={artist.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        {/* Tiểu sử */}
        <div>
          <label htmlFor="bio" className="block mb-2">Tiểu sử</label>
          <textarea
            id="bio"
            name="bio"
            value={artist.bio}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        {/* Ảnh */}
        <div>
          <label htmlFor="image" className="block mb-2">Ảnh nghệ sĩ</label>
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

export default CreateArtistAdmin;
