import {useEffect} from "react";
import {useAuth} from "../context/useAuth.ts";
import React from 'react'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";

const Layout: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // If authenticated and trying to access login/signup, redirect to dashboard
    useEffect(() => {
        if (isAuthenticated && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup')) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, location.pathname, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 font-inter">
            {isAuthenticated ? (
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 p-8">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <>
                    <header className="bg-indigo-600 text-white p-4 shadow-md rounded-b-lg">
                        <div className="container mx-auto flex justify-between items-center">
                            <h1 className="text-3xl font-bold">Book Club Library</h1>
                            <nav>
                                <ul className="flex space-x-4">
                                    <li><button onClick={() => navigate('/login')} className="text-white hover:text-indigo-200 text-lg">Login</button></li>
                                    <li><button onClick={() => navigate('/signup')} className="text-white hover:text-indigo-200 text-lg">Sign Up</button></li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                    <main className="container mx-auto p-8 flex justify-center items-center min-h-[calc(100vh-8rem)]">
                        <Outlet />
                    </main>
                    <footer className="bg-gray-800 text-white p-4 text-center rounded-t-lg">
                        <p>&copy; 2024 Book Club Library. All rights reserved.</p>
                    </footer>
                </>
            )}
        </div>
    );
};
export default Layout;