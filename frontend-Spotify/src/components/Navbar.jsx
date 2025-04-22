import React, { useState, useRef, useEffect } from "react";
import { GoHomeFill } from "react-icons/go";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const currentUser = localStorage.getItem("currentUser");
    const firstCharacter = isLoggedIn
        ? currentUser?.charAt(0).toUpperCase()
        : "S";

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentUser");
        setMenuOpen(false);
        navigate("/login");
    };

    const handleProfile = () => {
        setMenuOpen(false);
        navigate("/profile");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="text-white h-[10%] w-full flex px-4 justify-between items-center">
            <div className="flex items-center gap-2">
                <div
                    onClick={() => navigate("/")}
                    className="p-[6px] text-2xl cursor-pointer rounded-sm"
                >
                    {/* <IoLogoSlack className=""></IoLogoSlack> */}
                    <img
                        src={assets.logo}
                        alt=""
                        className="w-10 rounded-sm"
                    />
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="text-xl bg-[#242424] p-2 rounded-full cursor-pointer"
                >
                    <GoHomeFill />
                </button>
            </div>
            {/* Back and Forward buttons */}
            <div className="flex items-center gap-2">
                <img
                    onClick={() => navigate(-1)}
                    className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
                    src={assets.arrow_left}
                    alt="back"
                />
                <img
                    onClick={() => navigate(1)}
                    className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
                    src={assets.arrow_right}
                    alt="forward"
                />
            </div>

            {/* Search bar */}
            <div className="relative group min-w-lg">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 group-hover:text-green-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search chats"
                    className="text-white w-full bg-[#1f1f1f] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder-zinc-500"
                />
            </div>

            {/* Premium + Avatar + Menu */}
            <div className="flex items-center gap-4" ref={menuRef}>
                <button
                    onClick={() => navigate("/premium")}
                    className="px-4 py-1.5 text-sm font-semibold rounded-full bg-white cursor-pointer text-black hover:scale-105 transition-transform"
                >
                    Premium
                </button>

                {!isLoggedIn ? (
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer"
                    >
                        Login
                    </button>
                ) : (
                    <Menu>
                        <MenuButton className="w-12 h-12 rounded-full bg-[#ffffff26] p-2 flex items-center justify-center cursor-pointer">
                            <span className="text-white font-semibold text-lg">
                                {firstCharacter}
                            </span>
                        </MenuButton>
                        <MenuItems
                            anchor="bottom end"
                            className={
                                "bg-[#282828] text-white p-1 w-[190px] rounded-sm z-999"
                            }
                        >
                            <MenuItem>
                                <button
                                    onClick={handleProfile}
                                    className="rounded-sm px-3 py-2 w-full text-left data-[focus]:bg-[#ffffff26] flex justify-between items-center"
                                >
                                    <span>Profile</span>
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-start cursor-pointer rounded-sm px-3 py-2 data-[focus]:bg-[#ffffff26]"
                                >
                                    Logout
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                )}
            </div>
        </div>
    );
};

export default Navbar;
