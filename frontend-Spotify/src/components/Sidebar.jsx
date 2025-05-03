import React, { useContext, useEffect, useRef, useState } from "react";
import { LuLibrary } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { deleteLikedSong, getAllSongsPlaylist } from "../apis/songApi";
import { PlayerContext } from "../context/PlayerContext";
import { CiCircleMinus } from "react-icons/ci";
import { deleteLikedArtist, getAllArtistlist } from "../apis/artistApi";
import { useNavigate } from "react-router-dom";
import { deleteLikedAlbum, getAllAlbumlist } from "../apis/albumApi";
import ChatRoom from "./ChatRoom";

const Sidebar = () => {
    const { playWithId } = useContext(PlayerContext);
    const [selectedTab, setSelectedTab] = useState("playlists");
    const [roomId, setRoomId] = useState("");
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const socketRef = useRef(null);
    const [songPlaylist, setSongPlaylist] = useState([]);
    const [artistList, setArtistList] = useState([]);
    const [albumList, setAlbumList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const handlePlaylistUpdated = async () => {
            const data = await getAllSongsPlaylist();
            setSongPlaylist(data);
        };

        window.addEventListener("playlist-updated", handlePlaylistUpdated);

        return () => {
            window.removeEventListener(
                "playlist-updated",
                handlePlaylistUpdated
            );
        };
    }, []);

    useEffect(() => {
        const handleArtistUpdated = async () => {
            const data = await getAllArtistlist();
            setArtistList(data);
        };

        window.addEventListener("artist-updated", handleArtistUpdated);

        return () => {
            window.removeEventListener("artist-updated", handleArtistUpdated);
        };
    }, []);

    useEffect(() => {
        const handleAlbumUpdated = async () => {
            const data = await getAllAlbumlist();
            setAlbumList(data);
        };

        window.addEventListener("album-updated", handleAlbumUpdated);

        return () => {
            window.removeEventListener("album-updated", handleAlbumUpdated);
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
        const fetchAllArtistlist = async () => {
            const data = await getAllArtistlist();
            setArtistList(data);
        };

        if (artistList.length === 0) {
            fetchAllArtistlist();
        }
    }, []);

    useEffect(() => {
        const fetchAllAlbumlist = async () => {
            const data = await getAllAlbumlist();
            setAlbumList(data);
        };

        if (albumList.length === 0) {
            fetchAllAlbumlist();
        }
    }, []);


    function handleUnlike(songId) {
        deleteLikedSong(songId).then(() => {
            setSongPlaylist((prevSongs) =>
                prevSongs.filter((song) => song.id !== songId)
            );
        });
    }
    function handleUnlikeArtist(artistId) {
        deleteLikedArtist(artistId).then(() => {
            setArtistList((prevArtists) =>
                prevArtists.filter((artist) => artist.id !== artistId)
            );
        });
    }

    function handleUnlikeAlbum(albumId) {
        deleteLikedAlbum(albumId).then(() => {
            setAlbumList((prevAlbums) =>
                prevAlbums.filter((album) => album.id !== albumId)
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
                {selectedTab === "artists" && (
                    <div>
                        <div>
                            <h2 className="text-sm font-bold mb-3">
                                📂 Danh sách Artist
                            </h2>
                            {artistList.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 hover:bg-[#1e1e1e] rounded-lg cursor-pointer"
                                    onClick={() => {
                                        navigate(`/artist/${item.artist?.id}`);
                                    }}
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={item.artist?.image}
                                        alt={item.artist?.name}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-semibold">
                                            {item.artist?.name}
                                        </span>
                                    </div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUnlikeArtist(item.id);
                                        }}
                                        className="ml-auto text-2xl text-slate-300 hover:text-white transition duration-200 cursor-pointer"
                                    >
                                        <CiCircleMinus />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {selectedTab === "albums" && (
                    <div>
                        <div>
                            <h2 className="text-sm font-bold mb-3">
                                📂 Danh sách Album
                            </h2>
                            {albumList.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 hover:bg-[#1e1e1e] rounded-lg cursor-pointer"
                                    onClick={() => {
                                        navigate(`/album/${item.album?.id}`);
                                    }}
                                >
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={item.album?.image}
                                        alt={item.album?.title}
                                    />
                                    <div className="flex flex-col">
                                        <span className="font-semibold">
                                            {item.album?.title}
                                        </span>
                                    </div>
                                    <div
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUnlikeAlbum(item.id);
                                        }}
                                        className="ml-auto text-2xl text-slate-300 hover:text-white transition duration-200 cursor-pointer"
                                    >
                                        <CiCircleMinus />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === "chat" && (
                    <div>
                        <ChatRoom/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
