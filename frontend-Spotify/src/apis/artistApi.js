import axios from "axios";

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