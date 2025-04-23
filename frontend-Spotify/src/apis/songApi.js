import axios from "axios";
import { toast } from "react-toastify";

export async function getAllSongs() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/music/songs/", {
      });
        console.log("Danh sách bài hát:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài hát:", error);
      return [];
    }
}

export async function addToPlaylist(songId) {
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/music/liked-songs/',
            {
                song_id: songId, // body
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }
        );

        console.log('✅ Thêm vào playlist thành công:', response.data);
        
        // Hiển thị toast thông báo thành công
        toast.success("Thêm vào playlist thành công!");
    } catch (error) {
        console.error('❌ Lỗi khi thêm vào playlist:', error.response?.data || error.message);

        // Hiển thị toast báo lỗi
        toast.error("Có vẻ như bạn đã thêm bài hát này. Vui lòng thử lại!");
    }
};

export async function getAllSongsPlaylist() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/music/liked-songs/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    });
      console.log("Danh sách bài hát:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài hát:", error);
    return [];
  }
}

export async function deleteLikedSong(songId) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/music/liked-songs/${songId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    toast.success("Xóa thành công!");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xoá bài hát:", error);
    toast.error("Vui lòng thử lại!");
    return null;
  }
}
