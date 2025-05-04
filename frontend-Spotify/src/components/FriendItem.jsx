import React from 'react';

const FriendItem = ({ name, avatar }) => {
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className="flex items-center gap-3 p-2">
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center font-semibold text-lg">
          {initial}
        </div>
      )}
      <span className="text-base font-medium">{name}</span>
    </div>
  );
};

export default FriendItem;
