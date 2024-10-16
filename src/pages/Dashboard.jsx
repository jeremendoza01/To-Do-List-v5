import React from "react";
import { useAuth } from "../auth/AuthProvider"
import Navbar from "../components/Navbar/Navbar"
import "./styles/styles-Dashboard.css"
export const Dashboard = () => {
    const { user } = useAuth()
    return (
        <>
            <Navbar />
            <div className="container">
                {user && <h1>Hola, {user.name.first} {user.name.last}</h1>}
                <p>Esta pagina aun esta en proceso de desarrollo</p>
            </div>
        </>
    );
};
