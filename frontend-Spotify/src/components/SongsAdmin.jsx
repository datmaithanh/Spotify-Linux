import React, { useEffect, useState } from "react";
import {  deleteSong, getAllSongs } from "../apis/songApi";
import { useNavigate } from "react-router-dom";

const SongsAdmin = () => {
    const [songs, setSongs] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const data = await getAllSongs();
                setSongs(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bài hát:", error);
            }
        };
        fetchSongs();
    }, [accessToken]);

    const  handleEdit = (songId) => {
        
        navigate(`/admin/songs/edit/${songId}`);
    };

    const handleDelete = async (songId) => {
        const confirmDelete = window.confirm(
            "Bạn có chắc chắn muốn xóa bài hát này?"
        );
        if (confirmDelete) {
            try {
                await deleteSong(songId);
                setSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
                alert("Xóa bài hát thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa bài hát:", error);
                alert("Xóa bài hát thất bại!");
            }
        }
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold mb-4">Danh sách Bài Hát</h1>
                <button
                    onClick={() => navigate("/admin/songs/add")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Thêm Bài Hát
                </button>
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">ID</th>
                        <th className="border-b p-2">Ảnh</th>
                        <th className="border-b p-2">Tên bài hát</th>
                        <th className="border-b p-2">Thời lượng</th>
                        <th className="border-b p-2">AlbumID</th>
                        <th className="border-b p-2">Album</th>
                        <th className="border-b p-2">Nghệ sĩ</th>
                        <th className="border-b p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {songs?.map((song) => (
                        <tr key={song?.id}>
                            <td className="border-b p-2">{song?.id}</td>
                            <td className="border-b p-2">
                                <img
                                    src={song?.image}
                                    alt={song?.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </td>
                            <td className="border-b p-2">{song?.title}</td>
                            <td className="border-b p-2">{formatDuration(song?.duration)}</td>
                            <td className="border-b p-2">{song?.album_id}</td>
                            <td className="border-b p-2">{song?.album_name}</td>
                            <td className="border-b p-2">{song?.artist_name}</td>
                            <td className="border-b p-2 ">
                                <button
                                    onClick={() => handleEdit(song.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(song.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {songs?.length === 0 && (
                <p className="text-center text-gray-400 mt-4">
                    Không có bài hát nào.
                </p>
            )}
        </div>
    );
};

export default SongsAdmin;
