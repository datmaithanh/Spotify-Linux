import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { uploadImageToCloudinary } from "../apis/cloudinaryApi";
import { getAlbumById, updateAlbum } from "../apis/albumApi";
import { getAllArtist } from "../apis/artistApi";



const AlbumEditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [album, setAlbum] = useState({
    title: "",
    image: "",
    artist: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch album and artists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [albumData, artistsData] = await Promise.all([
          getAlbumById(id),
          getAllArtist(),
        ]);
        setAlbum(albumData);
        setImagePreview(albumData.image);
        setArtists(artistsData);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin album");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
      setAlbum((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setAlbum((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedAlbum = { ...album };

      if (album.image instanceof File) {
        const imageUrl = await uploadImageToCloudinary(album.image);
        updatedAlbum.image = imageUrl.secure_url;
      }

      await updateAlbum(id, updatedAlbum);
      navigate("/admin/albums");
    } catch (err) {
      setError("Không thể cập nhật thông tin album");
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Album</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tiêu đề Album */}
        <div>
          <label htmlFor="title" className="block mb-2">Tiêu đề</label>
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
          <label htmlFor="artist" className="block mb-2">Nghệ sĩ</label>
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
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Ảnh album"
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

export default AlbumEditAdmin;
