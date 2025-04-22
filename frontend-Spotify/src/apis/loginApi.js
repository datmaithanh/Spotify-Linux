import axios from "axios";

export async function loginUser(username, password) {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/users/login/",
            { username, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export async function detailUser(accessToken) {
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/users/me/",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
        throw error;
    }
}

export async function registerUser(username, email, password) {
  try {
    
    const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
      username,
      email,
      password,
    });

    
    return response.data; 
  } catch (error) {
    
    if (error.response) {
      
      throw new Error(error.response.data.message || 'Đăng ký thất bại');
    } else {
      
      throw new Error('Lỗi kết nối với server. Vui lòng thử lại sau.');
    }
  }
}

export async function changePassword(accessToken, oldPassword, newPassword) {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/users/change-password/",
            {
                old_password: oldPassword,
                new_password: newPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Lỗi khi đổi mật khẩu:", error);
        throw error;
    }
}

export async function loginGoogle(accessToken) {
    const response = await axios.post(
        "http://127.0.0.1:8000/api/users/auth/google-login/",
        {
            token: accessToken,
        }
    );
    return response.data;
}
