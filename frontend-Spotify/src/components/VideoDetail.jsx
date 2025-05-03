import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy id từ URL
import { getVideosById } from "../apis/videoApi";

const VideoDetail = () => {
    const { id } = useParams(); // Lấy id từ URL

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                setLoading(true);
                const data = await getVideosById(id);
                if (data) {
                    setVideo(data);
                } else {
                    setError("Video not found");
                }
            } catch (err) {
                setError("Error fetching video data");
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4 flex justify-center items-center max-h-[85vh]">
            <div className="bg-black text-white rounded-lg shadow-lg p-6 w-full">
                <div className="aspect-w-16 aspect-h-9 mb-4 relative">
                    <video
                        controls
                        autoPlay
                        className="w-full h-full rounded-lg object-cover"
                        src={video?.video_url}
                        type="video/mp4"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
                <h2 className="text-2xl font-semibold mb-4">{video?.title}</h2>

                <p className="text-sm text-gray-500 mt-2">
                    Nghệ sĩ: {video?.artist_detail?.name || "Unknown Artist"}
                </p>
            </div>
        </div>
    );
};

export default VideoDetail;
