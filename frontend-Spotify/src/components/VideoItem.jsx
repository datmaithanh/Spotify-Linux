import React from "react";
import { useNavigate } from "react-router-dom";

const VideoItem = ({ id, title, image }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/video/${id}`)}
            className="bg-gray-800 text-white rounded-lg shadow-lg p-4 mb-6 max-w-sm mx-auto"
        >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>

            <div className="aspect-w-8 aspect-h-5 mb-4">
                <img src={image} alt="" />
            </div>
        </div>
    );
};

export default VideoItem;
