import React, { use, useEffect, useState } from "react";
import FriendItem from "./FriendItem";
import { getFriendList } from "../apis/chatApi";
import { useNavigate } from "react-router-dom";

const DisplayFriend = () => {
    const [friends, setFriends] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const friendsData = await getFriendList(accessToken);
                console.log("Danh sách bạn bè:", friendsData);
                setFriends(friendsData);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bạn bè:", error);
            }
        };

        fetchFriends();
    }, [accessToken]);
    return (
        <div className="p-4">
            
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-bold ">Bạn bè</h2>
                <button className="cursor-pointer" onClick={() => navigate("/friend/request")}>Lời mời kết bạn</button>
                <button className="cursor-pointer" onClick={() => navigate("/friend/searchfriend")}>Tìm bạn bè</button>
            </div>
            <div className="space-y-2">
                {friends.map((friend) => (
                    <FriendItem
                        key={friend.id}
                        name={friend.username}
                        avatar={friend.avatar}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayFriend;
