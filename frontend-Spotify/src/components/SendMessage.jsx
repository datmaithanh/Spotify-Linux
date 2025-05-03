import React, { useState } from "react";

const SendMessage = ({ onSend }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== "") {
            onSend(message.trim());
            setMessage("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex p-2 border-t">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none text-black"
                placeholder="Nhập tin nhắn..."
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
            >
                Gửi
            </button>
        </form>
    );
};

export default SendMessage;