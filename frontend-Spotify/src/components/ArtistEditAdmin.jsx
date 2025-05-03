import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { uploadImageToCloudinary } from "../apis/cloudinaryApi";
import { getArtistById, updateArtist } from "../apis/artistApi";

const ArtistEditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [artist, setArtist] = useState({
    name: "",
    bio: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch artist data
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await getArtistById(id);
        setArtist(response);
        setImagePreview(response.image);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin nghệ sĩ");
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
      setArtist((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setArtist((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedArtist = { ...artist };

      // Upload ảnh nếu là File
      if (artist.image instanceof File) {
        const imageUrl = await uploadImageToCloudinary(artist.image);
        updatedArtist.image = imageUrl.secure_url;
      }

      await updateArtist(id, updatedArtist, accessToken);
      navigate("/admin/artists");
    } catch (err) {
      setError("Không thể cập nhật thông tin nghệ sĩ");
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Nghệ Sĩ</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên nghệ sĩ */}
        <div>
          <label htmlFor="name" className="block mb-2">
            Tên nghệ sĩ
          </label>
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
          <label htmlFor="bio" className="block mb-2">
            Tiểu sử
          </label>
          <textarea
            id="bio"
            name="bio"
            value={artist.bio}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            rows="4"
          ></textarea>
        </div>

        {/* Ảnh nghệ sĩ */}
        <div>
          <label htmlFor="image" className="block mb-2">
            Ảnh nghệ sĩ
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Ảnh nghệ sĩ"
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

        {/* Nút cập nhật */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default ArtistEditAdmin;
