// src/components/Message.jsx
import React from 'react';


const Message = ({ chatId, messages, currentUserId }) => {
  return (
    <div className="flex-1 overflow-hidden p-2 bg-gray-50">
      <div className="h-full overflow-y-auto">
        {chatId ? (
          <>
            <p className="text-green-600 text-sm font-medium text-center mb-2">
              ✅ Đang chọn Chat ID: <strong>{chatId}</strong>
            </p>
            <div className="space-y-2">
              {messages.map((msg, index) => {
                const isCurrentUser = msg.sender?.id === currentUserId;
                return (
                  <div
                    key={index}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg shadow text-sm ${
                        isCurrentUser
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-900'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <div className="text-[10px] mt-1 text-right opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 italic">
            Chọn một bạn để bắt đầu trò chuyện.
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
