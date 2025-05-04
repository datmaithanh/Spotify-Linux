import React, { useEffect, useState } from "react";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import ArtistItem from "./ArtistItem";
import DisplayVideo from "./DisplayVideo";
import { getAllSongs } from "../apis/songApi";
import { getAllArtist } from "../apis/artistApi";
import { getAllAlbum } from "../apis/albumApi";
import { PiVideoLight, PiVideoFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const DisplayHome = () => {
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtists = async () => {
            const data = await getAllArtist();
            setArtists(data);
        };
        fetchArtists();

        const fetchAlbums = async () => {
            const data = await getAllAlbum();
            setAlbums(data);
        };
        fetchAlbums();
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            const data = await getAllSongs();
            setSongs(data);
        };
        fetchSongs();
    }, []);

    return (
        <div className="flex">
            {/* Phần nội dung bên trái */}
            <div
                className={`transition-all duration-300 ${
                    showVideo ? "w-[75%]" : "w-full"
                }`}
            >
                <div className="p-4">
                    <div className="flex items-center mb-4 ">
                        <div className="mb-4 mr-4">
                            <button
                                onClick={() => navigate("/")}
                                className="bg-white hover:bg-gray-700 text-black px-6 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-500 shadow-md transition-all duration-200 transform hover:scale-105"
                            >
                                Music
                            </button>
                        </div>
                        <div className="flex mb-4 mr-4">
                            <button
                                onClick={() => navigate("/video")}
                                className="bg-[#121212] hover:bg-gray-700 text-white px-6 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-500 shadow-md transition-all duration-200 transform hover:scale-105"
                            >
                                Video
                            </button>
                        </div>
                        <div className="flex mb-4">
                            <button
                                onClick={() => navigate("/friend")}
                                className="bg-[#121212] hover:bg-gray-700 text-white px-6 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-500 shadow-md transition-all duration-200 transform hover:scale-105"
                            >
                                Friend
                            </button>
                        </div>
                    </div>

                    {/* Featured Charts */}
                    <div className="mb-4">
                        <h1 className="my-5 font-bold text-2xl">
                            Featured Charts
                        </h1>
                        <div className="flex overflow-auto gap-4">
                            {albums.map((item, index) => (
                                <AlbumItem
                                    key={index}
                                    name={item.title}
                                    decs={item.release_date}
                                    image={item.image}
                                    id={item.id}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Artist */}
                    <div className="mb-4">
                        <h1 className="my-5 font-bold text-2xl">Artist</h1>
                        <div className="flex overflow-auto gap-4">
                            {artists.map((item, index) => (
                                <ArtistItem
                                    key={index}
                                    name={item.name}
                                    decs={item.bio}
                                    image={item.image}
                                    id={item.id}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Songs */}
                    <div className="mb-8">
                        <h1 className="my-5 font-bold text-3xl text-white">
                            🔥 Today's Biggest Hits
                        </h1>
                        {songs.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {songs.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#1e1e1e] rounded-lg p-4 hover:bg-[#2a2a2a] transition duration-200 shadow-md"
                                    >
                                        <SongItem
                                            name={item.title}
                                            desc={item.desc}
                                            image={item.image}
                                            artist_name={item.artist_name}
                                            id={item.id}
                                            onAdded={() => {
                                                window.dispatchEvent(
                                                    new Event(
                                                        "playlist-updated"
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayHome;
