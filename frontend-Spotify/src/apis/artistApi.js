import axios from "axios";
import { toast } from "react-toastify";

export async function getAllArtist() {
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/music/artists/",
            {}
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getArtistById(artistId) {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/music/artists/${artistId}/`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getAllArtistlist() {
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/music/liked-artists/",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export async function addToArtistList(artistId) {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/music/liked-artists/",
            {
                artist_id: artistId,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );
        toast.success("Thêm thành công!");
    } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error("Có vẻ như bạn đã thêm nghệ sĩ này. Vui lòng thử lại!");
    }
}

export async function deleteLikedArtist(artistId) {
    try {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/music/liked-artists/${artistId}/`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }
        );
        toast.success("Xóa thành công!");
        return response.data;
    } catch (error) {
        console.error(error);
        toast.error("Vui lòng thử lại!");
        return null;
    }
}

export async function updateArtist(artistId, data) {
    try {
        const response = await axios.put(
            `http://127.0.0.1:8000/api/music/artists/${artistId}/`,
            {
                name: data.name,
                bio: data.bio,
                image: data.image,
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteArtist(artistId) {
    try {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/music/artists/${artistId}/`,
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

export async function addArtist(data, accessToken) {
    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/music/artists/`,
            {
                name: data.name,
                bio: data.bio,
                image: data.image,
            }
            ,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
