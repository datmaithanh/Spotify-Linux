import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { CiCirclePlus } from "react-icons/ci";
import { addToPlaylist } from "../apis/songApi";
const SongItem = ({ name, image, desc, artist_name, id, onAdded  }) => {
    const { playWithId } = useContext(PlayerContext);
    const handleAdd = async (e) => {
        e.stopPropagation();
        await addToPlaylist(id);
        if (onAdded) onAdded(); 
    };
    return (
        <div className="flex items-center justify-between bg-[#1e1e1e] rounded-lg p-4 hover:bg-[#2a2a2a] transition duration-200 shadow-md">
            <div
                onClick={() => playWithId(id)}
                className="flex items-center gap-4 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] w-full max-w-md"
            >
                <img
                    className="w-14 h-14 rounded object-cover"
                    src={image}
                    alt={name}
                />
                <div>
                    <p className="font-semibold text-white">{name}</p>
                    <p className="text-sm text-slate-300">{artist_name}</p>
                </div>
            </div>
            <div
                onClick={handleAdd}
                className="ml-auto text-2xl text-slate-300 hover:text-white transition duration-200"
            >
                <CiCirclePlus />
            </div>
        </div>
    );
};

export default SongItem;
