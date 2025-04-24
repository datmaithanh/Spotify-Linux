import axios from "axios";
import { toast } from "react-toastify";

export async function getAllArtist() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/music/artists/", {
      });
        console.log("Danh sách ca sĩ:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài hát:", error);
      return [];
    }
}

export async function getAllArtistlist() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/music/liked-artists/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    });
      console.log("Danh sách artist:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài hát:", error);
    return [];
  }
}
export async function addToArtistList(artistId) {
  try {
      const response = await axios.post(
          'http://127.0.0.1:8000/api/music/liked-artists/',
          {
            artist_id: artistId, 
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
      toast.success("Thêm thành công!");
  } catch (error) {
      console.error('❌ Lỗi khi thêm vào playlist:', error.response?.data || error.message);

      // Hiển thị toast báo lỗi
      toast.error("Có vẻ như bạn đã nghệ sĩ này. Vui lòng thử lại!");
  }
};


export async function deleteLikedArtist(artistId) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/music/liked-artists/${artistId}/`, {
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
