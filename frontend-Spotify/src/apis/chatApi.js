import axios from "axios";
import { toast } from "react-toastify";

export async function getFriendList(accessToken) {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/friends/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getChatId(userCurrentId, userFriendId, accessToken) {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/chat/get-or-create/",
            {
                userId: userCurrentId,
                friendId: userFriendId,
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
        console.error(error);
        return [];
    }
}

export async function getAllMessege(chatId, accessToken) {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/chats/${chatId}/messages/`,
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
        return [];
    }
}

export async function sendMessege(chatId, content, accessToken) {
    try {
        const response = await axios.post(
            `http://127.0.0.1:8000/api/chats/${chatId}/send_message/`,
            {
                content: content,
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
        console.error(error);
        return [];
    }
}
