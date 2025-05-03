import axios from "axios";
import { toast } from "react-toastify";

export async function getAllVideos() {
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/videos/videos/",
            {}
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getVideosById(videoId) {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/videos/videos/${videoId}/`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateVideo(videoId, data) {
    try {
        const response = await axios.put(
            `http://127.0.0.1:8000/api/videos/videos/${videoId}/`,
            {
                title: data.title,
                video_url: data.video_url,
                image: data.image,
                artist: data.artist,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteVideo(videoId) {
    try {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/videos/videos/${videoId}/`,
            {}
        );
        toast.success("Xóa thành công!");
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error("Vui lòng thử lại!");
        return null;
    }
}

export async function addVideo(data) {
    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/videos/videos/`,
            {
                title: data.title,
                video_url: data.video_url,
                image: data.image,
                artist: data.artist,
            },
            
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
