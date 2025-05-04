import React from "react";

const DisplaySearchFriend = ({
    userList = [],
    onSendRequest,
    friendIds = [],
}) => {
    return (
        <div className="space-y-4">
            {userList.length === 0 ? (
                <p className="text-gray-500">Không tìm thấy người dùng.</p>
            ) : (
                userList.map((user) => {
                    const isFriend = friendIds.includes(user.id);
                    return (
                        <div
                            key={user.id}
                            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.username}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white text-lg font-semibold">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <span className="font-medium text-gray-800">
                                    {user.username}
                                </span>
                            </div>
                            {!isFriend && (
                                <button
                                    onClick={() => onSendRequest(user.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm"
                                >
                                    Kết bạn
                                </button>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default DisplaySearchFriend;
