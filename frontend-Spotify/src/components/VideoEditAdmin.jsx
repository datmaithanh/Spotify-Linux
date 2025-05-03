import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideosById, updateVideo } from "../apis/videoApi";
import { getAllArtist } from "../apis/artistApi";
import { uploadImageToCloudinary, uploadVideoToCloudinary } from "../apis/cloudinaryApi";

const VideoEditAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState({
    title: "",
    video_url: "",
    image: "",
    artist: "",
  });

  const [artists, setArtists] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoData = await getVideosById(id);
        const artistList = await getAllArtist();
        setVideo({
          title: videoData.title,
          video_url: videoData.video_url,
          image: videoData.image || "",
          artist: videoData.artist_detail?.id || "",
        });
        setImagePreview(videoData.image || null);
        setArtists(artistList);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải dữ liệu video");
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file));
      setVideo((prev) => ({
        ...prev,
        imageFile: file,
      }));
    } else if (name === "video_file" && files.length > 0) {
      const file = files[0];
      setVideo((prev) => ({
        ...prev,
        video_file: file,
        video_url: URL.createObjectURL(file),
      }));
    } else if (name === "artistId") {
      setVideo((prev) => ({
        ...prev,
        artist: value,
      }));
    } else {
      setVideo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedVideo = {
        title: video.title,
        video_url: video.video_url,
        image: video.image,
        artist: parseInt(video.artist),
      };

      // Upload ảnh nếu có
      if (video.imageFile instanceof File) {
        const imageUrl = await uploadImageToCloudinary(video.imageFile);
        updatedVideo.image = imageUrl.secure_url;
      }

      // Upload video nếu có
      if (video.video_file instanceof File) {
        const videoUrl = await uploadVideoToCloudinary(video.video_file);
        updatedVideo.video_url = videoUrl.secure_url;
      }

      await updateVideo(id, updatedVideo);
      alert("Cập nhật thành công!");
      navigate("/admin/videos");
    } catch (err) {
      console.error(err);
      setError("Cập nhật thất bại");
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa Video</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tiêu đề */}
        <div>
          <label htmlFor="title" className="block mb-2">Tiêu đề</label>
          <input
            type="text"
            id="title"
            name="title"
            value={video.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />
        </div>

        {/* File video */}
        <div>
          <label htmlFor="video_file" className="block mb-2">Chọn video</label>
          <input
            type="file"
            id="video_file"
            name="video_file"
            accept="video/*"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          {video.video_url && (
            <div className="mt-4">
              <video controls src={video.video_url} className="w-full max-w-md rounded">
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            </div>
          )}
        </div>

        {/* Nghệ sĩ */}
        <div>
          <label htmlFor="artistId" className="block mb-2">Nghệ sĩ</label>
          <select
            id="artistId"
            name="artistId"
            value={video.artist}
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

        {/* Ảnh Video */}
        <div>
          <label htmlFor="image" className="block mb-2">Ảnh Video</label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Ảnh video"
              className="w-32 h-32 mb-2 object-cover rounded"
            />
          )}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
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

export default VideoEditAdmin;
