import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin = () => {
    const menuItems = [
        { label: "Quản lý User", path: "/admin/users" },
        { label: "Quản lý Bài Hát", path: "/admin/songs" },
        { label: "Quản lý Nghệ Sĩ", path: "/admin/artists" },
        { label: "Quản lý Album", path: "/admin/albums" },
        { label: "Quản lý Video", path: "/admin/videos" },
    ];
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(location.pathname);

    useEffect(() => {
        setSelectedTab(location.pathname);
    }, [location.pathname]);

    return (
        <div className="w-[25%] min-h-screen bg-black text-white  p-4 border-r border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
            <ul className="space-y-4">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.path}
                            onClick={() => setSelectedTab(item.path)}
                            className={`block px-4 py-2 rounded transition-all ${
                                selectedTab === item.path
                                    ? "bg-white text-black"
                                    : "hover:bg-gray-700 text-white"
                            }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SidebarAdmin;
