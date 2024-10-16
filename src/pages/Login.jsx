import Login from "../components/Login/Login";
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export const LoginPage = () => {
    const auth = useAuth();
    if (auth.isAuthenticated) {
        return <Navigate to="/" />;
    }
    return <Login />;
};