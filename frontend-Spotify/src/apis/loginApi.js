import axios from "axios";
import { GiConsoleController } from "react-icons/gi";

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
        console.error( error);
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

export async function registerUserForAdmin(user) {
    try {
      
      const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
        username: user.username,
        email: user.email,
        password: user.password,
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
        console.error( error);
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



export async function getAllUser(accessToken) {
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/users/users/",
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response;
    } catch (error) {
        console.error( error);
        throw error;
    }
}


export async function getUserById(userId ,accessToken) {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/users/users/${userId}/`,
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


export async function editUserById(userId ,data, accessToken) {
    try {
        console.log("data", data)
        const response = await axios.put(
            `http://127.0.0.1:8000/api/users/users/${userId}/update/`,
            {
                username: data.username,
                email: data.email,
                role:  data.role,
                is_vip: data.is_vip,
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


export async function deleteUserById(userId ,accessToken) {
    try {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/users/users/${userId}/delete/`,
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
