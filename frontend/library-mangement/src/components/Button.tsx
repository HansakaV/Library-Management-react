import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
    const baseStyle = 'px-4 py-2 rounded-md font-semibold transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';
    let variantStyle = '';

    switch (variant) {
        case 'primary':
            variantStyle = 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500';
            break;
        case 'secondary':
            variantStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
            break;
        case 'danger':
            variantStyle = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
            break;
    }

    return (
        <button className={`${baseStyle} ${variantStyle} ${className || ''}`} {...props}>
            {children}
        </button>
    );
};