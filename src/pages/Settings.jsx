import Navbar from "../components/Navbar/Navbar"
import { useAuth } from "../auth/AuthProvider"
import "./styles/styles-Settings.css"

function Settings() {

    const { logout } = useAuth();


    return (

        <>
            <Navbar />
            <div className="container">
                <h1 className="h2-settings">Settings</h1>
                <h2 className="h2-sesion">Cerrar sesion?</h2>
                <button type="submit" className="button" onClick={logout}>Cerrar Sesion</button>
            </div>
        </>
    );

}

export default Settings