import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Login from "./Login";
import Profile from "./Profile";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import Premium from "./Premium";
import DisplayArtist from "./DisplayArtist";
import DisplayVideo from "./DisplayVideo";
import VideoDetail from "./VideoDetail";
import DisplayFriend from "./DisplayFriend";
import DisplayFriendRequest from "./DisplayFriendRequest";
import DisplaySearchFriend from "./DisplaySearchFriend";
import SearchFriend from "./SearchFriend";
// import Chat from "./Chat";

// const currentUser = {
//     username: localStorage.getItem("currentUser"), 
//     role: localStorage.getItem("role"), 
// };


const Display = () => {
    return (
        <div className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
                <Route path="/artist/:id" element={<DisplayArtist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/premium" element={<Premium />} />
                <Route path="/video" element={<DisplayVideo />} />
                <Route path="/video/:id" element={<VideoDetail />} />
                <Route path="/friend" element={<DisplayFriend />} />
                <Route path="/friend/request" element={<DisplayFriendRequest />} />
                <Route path="/friend/searchfriend" element={<SearchFriend />} />
                {/* <Route path="/chat" element={<Chat currentUser={currentUser} />} />  */}
            </Routes>
        </div>
    );
};

export default Display;
