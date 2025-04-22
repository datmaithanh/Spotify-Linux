import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ name, image, desc, id }) => {
    const { playWithId } = useContext(PlayerContext);
    return (
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
                <p className="text-sm text-slate-300">{desc}</p>
            </div>
        </div>
    );
};

export default SongItem;
