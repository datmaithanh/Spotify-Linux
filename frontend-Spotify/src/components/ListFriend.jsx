// src/components/ListFriend.jsx
import React from 'react';

const ListFriend = ({ friendList, selectedFriendId, handleFriendClick }) => {
  return (
    <div className="h-[110px] p-2 border-b bg-white z-10 flex-shrink-0">
      <h2 className="text-base font-semibold mb-2 text-gray-800">Bạn bè</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-2 w-max pb-1">
          {friendList.map((friend) => (
            <div
              key={friend.id}
              onClick={() => handleFriendClick(friend)}
              className={`flex flex-col items-center w-12 cursor-pointer transition-transform duration-200 hover:scale-105 ${
                selectedFriendId === friend.id
                  ? "bg-blue-100 ring ring-blue-500"
                  : "bg-gray-100"
              } p-1 rounded-full shadow-sm`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-[12px] ${
                  selectedFriendId === friend.id
                    ? "bg-blue-500"
                    : "bg-gray-400"
                }`}
              >
                {friend.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-[10px] text-gray-700 mt-0.5 truncate w-full text-center">
                {friend.username}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListFriend;
