import React, { createContext, useEffect, useRef, useState } from "react";
import { getAllSongs } from "../apis/songApi";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [songs, setSongs] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });

    // Lấy danh sách bài hát từ API
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const fetchSongs = async () => {
            const data = await getAllSongs(accessToken);
            setSongs(data);
            if (data.length > 0) setTrack(data[0]);
        };
        fetchSongs();
    }, []);

    // Phát nhạc
    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    // Tạm dừng nhạc
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    // Phát bài hát theo id
    const playWithId = (id) => {
        const selectedSong = songs.find(song => song.id === id);
        if (selectedSong) {
            setTrack(selectedSong);
        }
    };

    // Bài trước
    const previous = () => {
        const index = songs.findIndex((s) => s.id === track?.id);
        if (index > 0) {
            setTrack(songs[index - 1]);
        }
    };

    // Bài sau
    const next = () => {
        const index = songs.findIndex((s) => s.id === track?.id);
        if (index < songs.length - 1) {
            setTrack(songs[index + 1]);
        }
    };

    // Seek bài hát
    const seekSong = (e) => {
        const percent = e.nativeEvent.offsetX / seekBg.current.clientWidth;
        if (audioRef.current && audioRef.current.duration) {
            audioRef.current.currentTime = percent * audioRef.current.duration;
        }
    };

    // Cập nhật thời lượng khi đổi bài
    useEffect(() => {
        const handleMetadataLoaded = () => {
            if (audioRef.current) {
                const duration = audioRef.current.duration;
                setTime({
                    currentTime: { second: 0, minute: 0 },
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60),
                    },
                });
            }
        };

        const audioEl = audioRef.current;
        if (audioEl) {
            audioEl.addEventListener("loadedmetadata", handleMetadataLoaded);
        }

        return () => {
            if (audioEl) {
                audioEl.removeEventListener("loadedmetadata", handleMetadataLoaded);
            }
        };
    }, [track]);

    // Cập nhật thời gian khi đang phát
    useEffect(() => {
        const handleTimeUpdate = () => {
            if (!audioRef.current || !seekBar.current || !track) return;

            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 1;

            seekBar.current.style.width = `${(current / duration) * 100}%`;

            setTime({
                currentTime: {
                    second: Math.floor(current % 60),
                    minute: Math.floor(current / 60),
                },
                totalTime: {
                    second: Math.floor(duration % 60),
                    minute: Math.floor(duration / 60),
                },
            });
        };

        const audioEl = audioRef.current;
        audioEl?.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audioEl?.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [track]);

    // Tự động phát khi track thay đổi
    useEffect(() => {
        const audioEl = audioRef.current;
        if (!audioEl || !track) return;

        const handleCanPlay = () => {
            audioEl.play().then(() => setPlayStatus(true)).catch(() => {});
        };

        audioEl.addEventListener("canplay", handleCanPlay);

        return () => {
            audioEl.removeEventListener("canplay", handleCanPlay);
        };
    }, [track]);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
        songs,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
