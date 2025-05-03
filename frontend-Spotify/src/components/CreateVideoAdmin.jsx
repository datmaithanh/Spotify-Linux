import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addVideo } from '../apis/videoApi';
import { getAllArtist } from '../apis/artistApi';
import { uploadImageToCloudinary, uploadVideoToCloudinary } from '../apis/cloudinaryApi';

const CreateVideoAdmin = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState({
    title: '',
    video_url: '',
    image: '',
    artist: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistData = await getAllArtist();
        setArtists(artistData);
      } catch (err) {
        setError('Không thể tải danh sách nghệ sĩ');
        console.error(err);
      }
    };
    fetchArtists();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image' && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else if (name === 'video_file' && files.length > 0) {
      const file = files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      setVideo({ ...video, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = video.image;
      let videoUrl = video.video_url;

      if (imageFile) {
        const uploadedImage = await uploadImageToCloudinary(imageFile);
        imageUrl = uploadedImage.secure_url;
      }

      if (videoFile) {
        const uploadedVideo = await uploadVideoToCloudinary(videoFile);
        videoUrl = uploadedVideo.secure_url;
      }

      const newVideo = {
        title: video.title,
        image: imageUrl,
        video_url: videoUrl,
        artist: parseInt(video.artist),
      };
      console.log(newVideo);

      await addVideo(newVideo);
      alert('Tạo video thành công!');
      navigate('/admin/videos');
    } catch (err) {
      console.error(err);
      setError('Không thể tạo video mới');
    }
  };

  return (
    <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <h1 className="text-2xl font-bold mb-4">Tạo Video Mới</h1>

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
          <label htmlFor="video_file" className="block mb-2">Chọn Video</label>
          <input
            type="file"
            id="video_file"
            name="video_file"
            accept="video/*"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          {videoPreview && (
            <video controls src={videoPreview} className="mt-2 w-full max-w-md rounded">
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          )}
        </div>

        {/* Nghệ sĩ */}
        <div>
          <label htmlFor="artist" className="block mb-2">Nghệ sĩ</label>
          <select
            id="artist"
            name="artist"
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

        {/* Ảnh đại diện */}
        <div>
          <label htmlFor="image" className="block mb-2">Ảnh Đại Diện</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        {/* Nút tạo */}
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
          Tạo mới
        </button>
      </form>
    </div>
  );
};

export default CreateVideoAdmin;
