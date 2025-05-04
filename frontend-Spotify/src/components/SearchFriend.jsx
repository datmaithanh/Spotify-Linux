import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplaySearchFriend from "./DisplaySearchFriend";
import { getFriendList } from "../apis/chatApi";

const SearchFriend = () => {
    const [searchText, setSearchText] = useState("");
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [friendIds, setFriendIds] = useState([]);
    const accessToken = localStorage.getItem("accessToken");

    const fetchFriendIds = async () => {
        try {
            const response = await getFriendList(accessToken);
            
            const ids = response.map((user) => user.id);
            setFriendIds(ids);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách bạn bè:", error);
        }
    };

    useEffect(() => {
        fetchFriendIds(); 
    }, []);

    const fetchUsers = async (keyword) => {
        if (!keyword.trim()) {
            setUserList([]);
            return;
        }

        try {
            setLoading(true);
            const accessToken = localStorage.getItem("accessToken"); // JWT access token
            const response = await axios.get(
                `http://127.0.0.1:8000/api/users/?search=${keyword}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setUserList(response.data);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm người dùng:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers(searchText);
        }, 500); // debounce 500ms

        return () => clearTimeout(delayDebounce);
    }, [searchText]);

    const handleSendRequest = async (userId) => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            await axios.post(
                "http://127.0.0.1:8000/api/friend-requests/",
                { to_user: userId },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert("Đã gửi lời mời kết bạn!");
        } catch (error) {
            console.error("Lỗi gửi lời mời:", error);
            alert("Không thể gửi lời mời.");
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <input
                type="text"
                placeholder="Tìm bạn bè..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-4">
                {loading ? (
                    <p className="text-gray-500">Đang tìm kiếm...</p>
                ) : (
                    <DisplaySearchFriend
                        userList={userList}
                        onSendRequest={handleSendRequest}
                        friendIds={friendIds}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchFriend;
