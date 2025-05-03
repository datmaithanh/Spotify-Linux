import axios from "axios";
import { toast } from "react-toastify";


export async function getAllAlbum() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/music/albums/", {
      });
      return response.data;
    } catch (error) {
      console.error( error);
      return [];
    }
}

export async function getAlbumById(albumId) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/music/albums/${albumId}/`, {
    });
    return response.data;
  } catch (error) {
    console.error( error);
    return [];
  }
}




export async function getAllAlbumlist() {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/music/liked-albums/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    });
    return response.data;
  } catch (error) {
    console.error( error);
    return [];
  }
}
export async function addToAlbumList(albumId) {
  try {
      const response = await axios.post(
          'http://127.0.0.1:8000/api/music/liked-albums/',
          {
            album_id: albumId, 
          },
          {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
          }
      );
      toast.success("Thêm thành công!");
  } catch (error) {
      console.error( error.response?.data || error.message);
      toast.error("Có vẻ như bạn đã thêm album này. Vui lòng thử lại!");
  }
};


export async function deleteLikedAlbum(albumId) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/music/liked-albums/${albumId}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    toast.success("Xóa thành công!");
    return response.data;
  } catch (error) {
    console.error( error);
    toast.error("Vui lòng thử lại!");
    return null;
  }
}


export async function updateAlbum(albumId, data) {
  try {
      const response = await axios.put(
          `http://127.0.0.1:8000/api/music/albums/${albumId}/`,
          {
              title:  data.title,
              image: data.image,
              artist: data.artist,
              release_date: data.release_date,
          }
      );
      return response.data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}


export async function deleteAlbum(albumId) {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/music/albums/${albumId}/`, {
      
    });
    toast.success("Xóa thành công!");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Vui lòng thử lại!");
    return null;
  }
}

export async function addAlbum(data, accessToken) {
  try {
      const response = await axios.post(
          `http://127.0.0.1:8000/api/music/albums/`,
          {
              title: data.title,
              release_date: data.release_date,
              image: data.image,
              artist: data.artist
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