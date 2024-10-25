import React from "react";
import { useAuth } from "../auth/AuthProvider"
import NavbarLogged from "../components/NavbarLogged/NavbarLogged"
import "./styles/styles-Dashboard.css"
export const Dashboard = () => {
    const { user } = useAuth()
    return (
        <>
            <NavbarLogged />
            <div className="container">
                {user && <h1 className="h1-user">Hola, {user.name.first} {user.name.last}</h1>}
                <p className="p">Esta pagina aun esta en proceso de desarrollo</p>
            </div>
        </>
    );
};
