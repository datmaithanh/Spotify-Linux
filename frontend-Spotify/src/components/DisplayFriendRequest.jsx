import React, { useEffect, useState } from "react";
import { acceptFriend, getFriendRequest } from "../apis/chatApi";

const DisplayFriendRequest = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchFriendRequests = async () => {
            try {
                const data = await getFriendRequest(accessToken);
                console.log("Danh sách lời mời kết bạn:", data);
                setFriendRequests(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách lời mời kết bạn:", error);
            }
        };

        fetchFriendRequests();
    }, [accessToken]);

    const handleAcceptRequest = async (requestId) => {
        try {
            const data =  await acceptFriend(requestId, accessToken);
            setFriendRequests(prev => prev.filter(req => req.id !== requestId));
        } catch (error) {
            console.error("Lỗi khi chấp nhận lời mời:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Lời mời kết bạn</h2>
            <div className="space-y-4">
                {friendRequests.map((req) => (
                    <div
                        key={req.id}
                        className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                    >
                        <div className="flex items-center space-x-4">
                            {req.from_user.avatar ? (
                                <img
                                    src={req.from_user.avatar}
                                    alt={req.from_user.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-semibold">
                                    {req.from_user.username.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <span className="text-gray-800 font-medium">
                                {req.from_user.username}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleAcceptRequest(req.id)}
                                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Chấp nhận
                            </button>
                            <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                                Từ chối
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayFriendRequest;
