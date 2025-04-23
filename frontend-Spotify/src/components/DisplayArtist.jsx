import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import { getAllArtist } from "../apis/artistApi";
import { CiCirclePlus } from "react-icons/ci";

const DisplayArtist = () => {
    const { id } = useParams();
    const [artists, setArtists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const { playWithId } = useContext(PlayerContext);

    useEffect(() => {
        const fetchArtists = async () => {
            const data = await getAllArtist();
            console.log("song", data[id - 1]);
            setArtists(data[id - 1]);
            setAlbums(data[id - 1].albums[0]);
            setSongs(data[id - 1].albums[0].songs);
        };
        fetchArtists();
    }, []);
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    };

    return (
        <div>
            {/* Artist Header */}
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end">
                <img
                    className="w-48 rounded"
                    src={artists?.image}
                    alt={artists?.name}
                />
                <div className="flex flex-col">
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                        {artists?.name}
                    </h2>
                    <h4>{artists?.bio}</h4>
                    <p className="mt-1 flex items-center gap-1">
                        <img
                            className="w-5 inline-block"
                            src={assets.logo}
                            alt="Spotify logo"
                        />
                        <b>Spotify</b>
                    </p>
                </div>
            </div>

            {/* Header for Song List */}
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>
                    <b className="mr-4">#</b>Title
                </p>
                <p>Album</p>
                <p className="hidden sm:block">Date Added</p>
                <img
                    className="m-auto w-4"
                    src={assets.clock_icon}
                    alt="Duration Icon"
                />
            </div>
            <hr />

            {/* Songs List */}
            {songs?.map((item, index) => (
                <div key={index}>
                    <div
                        onClick={() => playWithId(item.id)}
                        className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                    >
                        <div className="text-white flex items-center">
                            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                            <img
                                className="w-10 mr-5"
                                src={item.image}
                                alt={item.title}
                            />
                            <div className="flex flex-col items-start">
                                <div>{item.title}</div>
                                <div className="text-sm text-slate-300">
                                    {artists.name}
                                </div>
                            </div>
                        </div>

                        <p className="text-[15px]">
                            {artists?.albums?.[0]?.title}
                        </p>
                        <p className="text-[15px] hidden sm:block">
                            5 days ago
                        </p>

                        {/* Time and Icon */}
                        <div className="flex justify-center items-center text-[15px] gap-4">
                            <div className="text-slate-400">
                                {formatDuration(item.duration)}
                            </div>
                            {/* Prevent propagation here */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    
                                }}
                                className="text-2xl text-slate-300 hover:text-white transition duration-200 cursor-pointer"
                            >
                                <CiCirclePlus />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayArtist;
