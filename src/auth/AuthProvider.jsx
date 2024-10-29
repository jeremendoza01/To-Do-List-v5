import { useContext, createContext, useState } from "react";
import { API_URL } from "../api";

const AuthContext = createContext({
    isAuthenticated: false,
    isLoading: false,
    login: async () => { },
    logout: () => { },
    user: null
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (username, password) => {
        setIsLoading(true)
        try {
            const resp = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await resp.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                setUser(data.user);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.log('Error en la petición de login: ', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, user, isLoading }}> {/* Incluir isLoading en el contexto */}
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
