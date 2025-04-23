import React, { useContext, useEffect, useRef, useState } from "react";
import { LuLibrary } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { deleteLikedSong, getAllSongsPlaylist } from "../apis/songApi";
import { PlayerContext } from "../context/PlayerContext";
import { CiCircleMinus } from "react-icons/ci";

const Sidebar = () => {
    const { playWithId } = useContext(PlayerContext);
    const [selectedTab, setSelectedTab] = useState("playlists");
    const [roomId, setRoomId] = useState("");
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const socketRef = useRef(null);
    const [songPlaylist, setSongPlaylist] = useState([]);
    

   
    useEffect(() => {
        const handlePlaylistUpdated = async () => {
            const data = await getAllSongsPlaylist();
            setSongPlaylist(data);
        };
    
        window.addEventListener("playlist-updated", handlePlaylistUpdated);
        
        return () => {
            window.removeEventListener("playlist-updated", handlePlaylistUpdated);
        };
    }, []);
    
    useEffect(() => {
        const fetchAllSongsPlaylist = async () => {
            const data = await getAllSongsPlaylist();
            setSongPlaylist(data);
        };
    
        if (songPlaylist.length === 0) {
            fetchAllSongsPlaylist();
        }
    }, []); 
    
    

    

    useEffect(() => {
        if (!roomId || !connected) return;

        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomId}/`);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("✅ Kết nối WebSocket đến:", roomId);
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessages((prev) => [...prev, data]);
        };

        socket.onerror = (err) => {
            console.error("⚠️ WebSocket Error:", err);
        };

        socket.onclose = () => {
            console.log("❌ WebSocket ngắt kết nối");
        };

        return () => {
            socketRef.current?.close();
        };
    }, [roomId, connected]);

    const sendMessage = () => {
        if (input.trim() && socketRef.current) {
            socketRef.current.send(
                JSON.stringify({ message: input, sender: username })
            );
            setInput("");
        }
    };

    const handleConnect = () => {
        if (roomId.trim()) setConnected(true);
    };

    function handleUnlike(songId) {
        deleteLikedSong(songId).then(() => {
            setSongPlaylist((prevSongs) =>
                prevSongs.filter((song) => song.id !== songId)
            );
            
        });
    }
    

    return (
        <div className="sidebar w-[25%] h-full p-2 hidden lg:flex flex-col gap-2 text-white">
            {/* Top Section */}
            <div className="sticky top-0 left-0 right-0 pt-4 bg-[#121212] rounded-lg">
                <div className="flex items-center gap-2 mb-6 m-3">
                    <LuLibrary className="w-6 h-6 text-white" />
                    <span className="font-bold">Your Library</span>
                </div>

                {/* Navigation Buttons (4 nút nhỏ, mỗi cái 20%) */}
                <div className="flex justify-between gap-2 px-3 pb-4">
                    {["Playlists", "Artists", "Albums", "Chat"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab.toLowerCase())}
                            className={`w-[20%] text-sm py-2 rounded-full transition-all duration-200 ${
                                selectedTab === tab.toLowerCase()
                                    ? "bg-white text-black font-semibold"
                                    : "bg-[#1a1a1a] text-white hover:bg-[#333]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative group mb-3 mx-3">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 group-hover:text-green-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search chats"
                        className="text-white w-full bg-zinc-800/50 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder-zinc-500"
                    />
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-[#121212] h-[85%] rounded p-4 text-sm text-white overflow-y-auto">
                {selectedTab === "playlists" && (
                    <div>
                        <h2 className="text-sm font-bold mb-3">
                            📂 Danh sách liked
                        </h2>
                        {songPlaylist.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2 hover:bg-[#1e1e1e] rounded-lg cursor-pointer"
                                onClick={() => playWithId(item.song?.id)}
                            >
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={item.song?.image}
                                    alt={item.title}
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold">
                                        {item.song?.title}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {item.desc}
                                    </span>
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnlike(item.id);
                                    }}
                                    className="ml-auto text-2xl text-slate-300 hover:text-white transition duration-200 cursor-pointer"
                                >
                                    <CiCircleMinus />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {selectedTab === "artists" && <div>💿 Danh sách Nghệ sĩ</div>}
                {selectedTab === "albums" && <div>👨‍🎤 Danh sách Album</div>}

                {selectedTab === "chat" && (
                    <div className="bg-[#1e1e1e] p-4 rounded-2xl shadow-lg border border-[#333]">
                        <h2 className="text-sm font-bold mb-3">💬 Chat Room</h2>

                        {!connected ? (
                            <>
                                <input
                                    className="w-full text-black px-3 py-2 rounded-lg text-sm mb-3"
                                    type="text"
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                    placeholder="Nhập tên phòng (vd: room123)"
                                />
                                <button
                                    onClick={handleConnect}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg w-full"
                                >
                                    🚪 Tham gia phòng
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="text-sm text-gray-300 mb-3">
                                    Đã kết nối đến{" "}
                                    <strong className="text-white">
                                        {roomId}
                                    </strong>
                                </div>

                                <div className="h-48 overflow-y-auto bg-[#2b2b2b] p-3 rounded-xl mb-3 flex flex-col gap-2 scroll-smooth">
                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`max-w-[75%] px-4 py-2 rounded-xl break-words text-white ${
                                                msg.sender === username
                                                    ? "self-end bg-gradient-to-br from-blue-500 to-blue-700 text-right"
                                                    : "self-start bg-neutral-700 text-left"
                                            }`}
                                        >
                                            {msg.message}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 text-black px-3 py-2 rounded-lg text-sm"
                                        type="text"
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === "Enter" && sendMessage()
                                        }
                                        placeholder="Nhập tin nhắn..."
                                    />
                                    <button
                                        onClick={sendMessage}
                                        className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg"
                                    >
                                        📤 Gửi
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
