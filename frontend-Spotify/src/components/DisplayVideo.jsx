import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllVideos } from "../apis/videoApi";
import VideoItem from "./VideoItem";

const DisplayVideo = () => {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const data = await getAllVideos();
            console.log(data);
            setVideos(data);
        };
        fetchVideos();
    }, []);

    return (
        <div className="p-4">
            <div>
                <div className="flex items-center mb-4">
                    <div className="mb-4 mr-4">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#121212] hover:bg-gray-700 text-white px-6 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-500 shadow-md transition-all duration-200 transform hover:scale-105"
                        >
                            Music
                        </button>
                    </div>
                    <div className="flex mb-4">
                        <button
                            onClick={() => navigate("/video")}
                            className="bg-white hover:bg-gray-700 text-black px-6 py-3 rounded-lg border-2 border-gray-700 hover:border-gray-500 shadow-md transition-all duration-200 transform hover:scale-105"
                        >
                            Video
                        </button>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        {videos.map((video) => (
                            <VideoItem
                                id={video.id}
                                key={video.id}
                                title={video.title}
                                video_url={video.video_url}
                                image={video.image}
                                artist={video.artist}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayVideo;
