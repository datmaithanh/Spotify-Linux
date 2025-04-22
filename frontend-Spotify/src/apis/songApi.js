import axios from "axios";

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