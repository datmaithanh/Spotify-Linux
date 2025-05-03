import axios from "axios";
import { toast } from "react-toastify";

export async function getAllSongs() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/music/songs/", {
      });
      return response.data;
    } catch (error) {
      console.error( error);
      return [];
    }
}

export async function getSongsById(songId) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/music/songs/${songId}/`, {
    });
    return response.data;
  } catch (error) {
    console.error( error);
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
        toast.success("Thêm vào playlist thành công!");
    } catch (error) {
        console.error( error.response?.data || error.message);
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
    return response.data;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    toast.error("Vui lòng thử lại!");
    return null;
  }
}


export async function addSong( data, accessToken) {
  try {
      const response = await axios.post(
          `http://127.0.0.1:8000/api/music/songs/`,
          {
              title: data.title,
              duration: data.duration,
              audio_url:  data.audio_url,
              image: data.image,
              album_id: data.album_id,
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
              },
              
          }
      );
      return response.data;
  } catch (error) {
      console.error( error);
      throw error;
  }
}

export async function updateSong(songId ,data, accessToken) {
  try {
      const response = await axios.put(
          `http://127.0.0.1:8000/api/music/songs/${songId}/`,
          {
              title: data.title,
              duration: data.duration,
              audio_url:  data.audio_url,
              image: data.image,
              album_id: data.album_id,
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
              },
              
          }
      );
      return response.data;
  } catch (error) {
      console.error( error);
      throw error;
  }
}

export async function deleteSong(songId) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/music/songs/${songId}/`, {
      
    });
    toast.success("Xóa thành công!");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Vui lòng thử lại!");
    return null;
  }
}
