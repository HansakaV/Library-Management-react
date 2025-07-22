import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/useAuth.ts";
import {Button} from "./Button.tsx";
import React from "react";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Readers', path: '/dashboard/customers' },
        { name: 'Books', path: '/dashboard/items' },
        { name: 'Lendings', path: '/dashboard/orders' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-64 bg-gray-800 text-white flex flex-col h-screen rounded-r-lg shadow-lg">
            <div className="p-6 text-2xl font-bold text-indigo-300 border-b border-gray-700">
                Library Admin
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center w-full px-4 py-2 rounded-md text-left text-lg font-medium transition duration-200 ease-in-out
              ${location.pathname === item.path ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    >
                        {item.name}
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
                <Button onClick={handleLogout} variant="secondary" className="w-full bg-gray-700 text-gray-200 hover:bg-gray-600">
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;