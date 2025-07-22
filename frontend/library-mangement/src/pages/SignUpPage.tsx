import AuthForm from "../components/AuthForm.tsx";
import React  from "react";
import {useNavigate} from "react-router-dom";

const Signup: React.FC = () => {
    const navigate = useNavigate();

    const handleSignup = (data: any) => {
        console.log('Signup attempt:', data);
        // In a real app, you'd send this to your backend to register a new user
        // For demo, just log and redirect to login
        alert('Signup successful! Please log in.'); // Using alert for simplicity, replace with custom modal
        navigate('/login');
    };

    return (
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Create a new account</h2>
            <AuthForm type="signup" onSubmit={handleSignup} />
            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
                </button>
            </p>
        </div>
    );
};

export default Signup;