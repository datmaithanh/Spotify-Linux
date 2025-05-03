import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteVideo, getAllVideos } from "../apis/videoApi";

const VideosAdmin = () => {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data = await getAllVideos();
                setVideos(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách video:", error);
            }
        };
        fetchVideos();
    }, [accessToken]);

    const handleEdit = (videoId) => {
        navigate(`/admin/videos/edit/${videoId}`);
    };

    const handleDelete = async (videoId) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa video này?"
        );
        if (confirmDelete) {
            try {
                await deleteVideo(videoId);
                setVideos((prev) => prev.filter((v) => v.id !== videoId));
                alert("Xóa video thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa video:", error);
                alert("Xóa video thất bại!");
            }
        }
    };

    return (
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Danh sách Video</h1>
                <button
                    onClick={() => navigate("/admin/videos/add")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Thêm Video
                </button>
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">ID</th>
                        <th className="border-b p-2">Tiêu đề</th>
                        <th className="border-b p-2">Video</th>
                        <th className="border-b p-2">Nghệ sĩ</th>
                        <th className="border-b p-2">Ảnh nghệ sĩ</th>
                        <th className="border-b p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {videos?.map((video) => (
                        <tr key={video?.id}>
                            <td className="border-b p-2">{video?.id}</td>
                            <td className="border-b p-2">{video?.title}</td>
                            <td className="border-b p-2">
                                <video controls width="150" className="rounded">
                                    <source src={video?.video_url} type="video/mp4" />
                                    Trình duyệt không hỗ trợ video.
                                </video>
                            </td>
                            <td className="border-b p-2">{video?.artist_detail?.name}</td>
                            <td className="border-b p-2">
                                <img
                                    src={video?.artist_detail?.image}
                                    alt={video?.artist_detail?.name}
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                            </td>
                            <td className="border-b p-2">
                                <button
                                    onClick={() => handleEdit(video.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(video.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {videos?.length === 0 && (
                <p className="text-center text-gray-400 mt-4">
                    Không có video nào.
                </p>
            )}
        </div>
    );
};

export default VideosAdmin;
