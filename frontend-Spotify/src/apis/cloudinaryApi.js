
import axios from "axios";

export async function uploadImageToCloudinary(file) {
    const url = "https://api.cloudinary.com/v1_1/dxnuzxb59/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}
export async function uploadMP3ToCloudinary(file) {
    const url = "https://api.cloudinary.com/v1_1/dxnuzxb59/raw/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}export async function uploadVideoToCloudinary(file) {
    const url = "https://api.cloudinary.com/v1_1/dxnuzxb59/video/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
        const response = await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}