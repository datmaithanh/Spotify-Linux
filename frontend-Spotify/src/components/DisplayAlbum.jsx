import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { getAllAlbum } from "../apis/albumApi";
import { CiCirclePlus } from "react-icons/ci";
import { addToPlaylist } from "../apis/songApi";

const DisplayAlbum = () => {
    const { id } = useParams();
    const [album, setAlbum] = useState([]);
    useEffect(() => {
        const fetchAlbums = async () => {
            const data = await getAllAlbum();
            setAlbum(data);
        };
        fetchAlbums();
    }, []);
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    };
    const { playWithId } = useContext(PlayerContext);

    return (
        <>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={album[0]?.image} alt="" />
                <div className="flex flex-col">
                    <p>Album</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                        {album[0]?.title}
                    </h2>
                    <h4>{album.desc}</h4>
                    <p className="mt-1">
                        <img
                            className="inline-block w-5"
                            src={assets.logo}
                            alt=""
                        />
                        <b> Spotify </b>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>
                    <b className="mr-4">#</b>Title
                </p>
                <p>Album</p>
                <p className="hidden sm:block">Date Added</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr />

            {album[0]?.songs.map((item, index) => (
                <div
                    key={index}
                    className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                    onClick={() => playWithId(item.id)}
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
                                {item.artist_name}
                            </div>
                        </div>
                    </div>
                    <p className="text-[15px]">{album[0]?.title}</p>
                    <p className="text-[15px] hidden sm:block">
                        {album[0]?.release_date}
                    </p>
                    <div className="flex justify-center gap-4 items-center text-[15px] px-2">
                        <div className="text-slate-400">
                            {formatDuration(item.duration)}
                        </div>
                        <div
                            className="text-2xl text-slate-300 hover:text-white transition duration-200 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                addToPlaylist(item.id); // Gọi hàm thêm vào playlist của bạn
                            }}
                        >
                            <CiCirclePlus />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DisplayAlbum;
