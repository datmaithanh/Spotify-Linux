import React, { useState, useEffect, useRef } from "react";
import { getAllMessege, getChatId, getFriendList } from "../apis/chatApi";
import { detailUser } from "../apis/loginApi";
import ListFriend from "./ListFriend";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatRoom = () => {
    const [chatId, setChatId] = useState(null);
    const [selectedFriendId, setSelectedFriendId] = useState(null);
    const [friendList, setFriendList] = useState([]);
    const accessToken = localStorage.getItem("accessToken");
    const [messages, setMessages] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);
    const [currentUsername, setCurrentUsername] = useState("");

    // Lấy danh sách bạn bè
    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const res = await getFriendList(accessToken);
                setFriendList(res);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách bạn bè:", error);
            }
        };
        fetchFriendList();
    }, [accessToken]);

    // Khi chọn bạn mới, lấy Chat ID + tin nhắn + kết nối WebSocket
    useEffect(() => {
        const initChat = async () => {
            if (!selectedFriendId) return;

            try {
                const userCurrent = await detailUser(accessToken);
                const userCurrentId = userCurrent.data.id;
                console.log("ID người dùng hiện tại:", userCurrentId);
                setCurrentUserId(userCurrentId);
                setCurrentUsername(userCurrent.data.username);

                const res = await getChatId(
                    userCurrentId,
                    selectedFriendId,
                    accessToken
                );
                const chatIdValue =
                    typeof res.chat_id === "object"
                        ? res.chat_id.chat_id
                        : res.chat_id;

                setChatId(chatIdValue);

                const mes = await getAllMessege(chatIdValue, accessToken);
                setMessages(mes);

                // Đóng WebSocket cũ nếu có
                if (socket) socket.close();

                // Tạo WebSocket mới
                const newSocket = new WebSocket(
                    `ws://localhost:8000/ws/chat/${chatIdValue}/`
                );
                setSocket(newSocket);

                // Nhận tin nhắn từ WebSocket
                newSocket.onmessage = (event) => {
                    
                    const data = JSON.parse(event.data);
                    console.log("Nhận tin nhắn:", data);
                    if (data.message) {
                        setMessages((prev) => [
                            ...prev,
                            {
                                id: Date.now(), // Tạo ID tạm cho tin nhắn
                                content: data.message,
                                sender: {
                                    id: data.sender.id,
                                    username: data.sender.username,
                                },
                                timestamp: new Date().toISOString(),
                            },
                        ]);
                    }
                };

                // Xử lý khi WebSocket đóng
                newSocket.onclose = () => {
                    console.log("WebSocket closed");
                };

                // Xử lý khi có lỗi WebSocket
                newSocket.onerror = (error) => {
                    console.error("WebSocket Error:", error);
                };
            } catch (error) {
                console.error("Lỗi khi khởi tạo chat:", error);
            }
        };

        initChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFriendId]);

    // Scroll đến cuối khi có tin nhắn mới
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Xử lý sự kiện khi người dùng chọn bạn bè
    const handleFriendClick = (friend) => {
        setSelectedFriendId(friend.id);
    };

    // Gửi tin nhắn
    const handleSendMessage = (content) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            const messageData = {
                message: content,
                sender: { sender_id: currentUserId, sender_username: currentUsername },
            };
            console.log("Gửi tin nhắn:", messageData);
            socket.send(JSON.stringify(messageData));
        } else {
            console.error("WebSocket chưa sẵn sàng.");
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-white shadow rounded-md h-[350px] flex flex-col overflow-hidden">
            <div className="flex-shrink-0">
                <ListFriend
                    friendList={friendList}
                    selectedFriendId={selectedFriendId}
                    handleFriendClick={handleFriendClick}
                />
            </div>

            <div className="flex-grow overflow-auto mt-2">
                <Message
                    chatId={chatId}
                    messages={messages}
                    currentUserId={currentUserId}
                />
                <div ref={messagesEndRef} />
            </div>

            <SendMessage onSend={handleSendMessage} />
        </div>
    );
};

export default ChatRoom;
