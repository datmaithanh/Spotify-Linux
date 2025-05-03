import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteArtist, getAllArtist } from "../apis/artistApi";


const ArtistsAdmin = () => {
    
    const [artists, setArtists] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();


    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const res = await getAllArtist();
                setArtists(res);
            } catch (error) {
                console.error("Lỗi khi lấy nghệ sĩ:", error);
            }
        };
        fetchArtists();
    }, [accessToken]);

    const handleEdit = (artistId) => {
        console.log("Sửa nghệ sĩ:", artistId);
        navigate(`/admin/artists/edit/${artistId}`);
    };

    const handleDelete = async (artistId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nghệ sĩ này?");
        if (confirmDelete) {
            try {
                await deleteArtist(artistId);
                setArtists((prev) => prev.filter((artist) => artist.id !== artistId));
                alert("Xóa nghệ sĩ thành công!");
            } catch (error) {
                console.error("Lỗi khi xóa nghệ sĩ:", error);
                alert("Xóa nghệ sĩ thất bại!");
            }
        }
    };

    return (
        <div className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[100%] lg:ml-0">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Danh sách Nghệ sĩ</h1>
                <button
                    onClick={() => navigate("/admin/artists/add")}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Thêm Nghệ sĩ
                </button>
            </div>

            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b p-2">ID</th>
                        <th className="border-b p-2">Tên</th>
                        <th className="border-b p-2">Ảnh</th>
                        <th className="border-b p-2">Tiểu sử</th>
                        <th className="border-b p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {artists?.map((artist) => (
                        <tr key={artist?.id}>
                            <td className="border-b p-2">{artist?.id}</td>
                            <td className="border-b p-2">{artist?.name}</td>
                            <td className="border-b p-2">
                                <img
                                    src={artist?.image}
                                    alt={artist?.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            </td>
                            <td className="border-b p-2">{artist?.bio}</td>
                            <td className="border-b p-2 ">
                                <button
                                    onClick={() => handleEdit(artist.id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(artist.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {artists?.length === 0 && (
                <p className="text-center text-gray-400 mt-4">Không có nghệ sĩ nào.</p>
            )}
        </div>
    );
};

export default ArtistsAdmin;
