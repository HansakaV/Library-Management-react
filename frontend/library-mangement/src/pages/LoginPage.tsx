import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/useAuth.ts";
import React   from "react";
import AuthForm from "../components/AuthForm.tsx";

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (data: any) => {
        console.log('Login attempt:', data);
        // In a real app, you'd send this to your backend and get a JWT
        // For demo, simulate successful login
        const dummyToken = 'mock_jwt_token_for_demo';
        login(dummyToken);
        navigate('/dashboard'); // Redirect to dashboard after login
    };

    return (
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">Sign in to your account</h2>
            <AuthForm type="login" onSubmit={handleLogin} />
            <p className="mt-6 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button onClick={() => navigate('/signup')} className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                </button>
            </p>
        </div>
    );
};
export default Login;