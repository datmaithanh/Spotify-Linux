import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
    const {
        track,
        seekBar,
        seekBg,
        playStatus,
        play,
        pause,
        time,
        previous,
        next,
        seekSong,
    } = useContext(PlayerContext);

    if (!track) return null; // Không render gì nếu chưa có bài hát

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-[10%] bg-black flex items-center text-white justify-between px-4">
            {/* LEFT - THÔNG TIN BÀI HÁT */}
            <div className="hidden lg:flex items-center gap-4">
                <img className="w-12 h-12 object-cover rounded" src={track.image} alt={track.title} />
                <div>
                    <p className="font-semibold">{track.title}</p>
                    <p className="text-sm opacity-70">{track.desc?.slice(0, 12)}</p>
                </div>
            </div>

            
            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4 items-center">
                    <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" />
                    <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="Previous" />
                    {playStatus ? (
                        <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="Pause" />
                    ) : (
                        <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="Play" />
                    )}
                    <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="Next" />
                    <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
                </div>
                <div className="flex items-center gap-5 text-sm">
                    <p>
                        {time.currentTime.minute}:{String(time.currentTime.second).padStart(2, "0")}
                    </p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
                    >
                        <hr
                            ref={seekBar}
                            className="h-1 border-none w-0 bg-green-800 rounded-full"
                        />
                    </div>
                    <p>
                        {time.totalTime.minute}:{String(time.totalTime.second).padStart(2, "0")}
                    </p>
                </div>
            </div>

            {/* RIGHT - ICON KHÁC */}
            <div className="hidden lg:flex items-center gap-2 opacity-75">
               
                <img className="w-4" src={assets.volume_icon} alt="" />
                <div className="w-20 bg-slate-50 h-1 rounded"></div>

            </div>
        </div>
    );
};

export default Player;
