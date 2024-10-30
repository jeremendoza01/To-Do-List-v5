import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import { useAuth } from "../auth/AuthProvider";
import "./styles/styles-Settings.css";

function Settings() {
    const { logout, user } = useAuth();
    return (
        <>
            <NavbarLogged />
            <div className="settings-container">
                <h1 className="settings-title">Settings</h1>

                {/* User Profile Section */}
                <div className="profile-section">
                    <h2 className="section-title">Perfil del Usuario</h2>
                    <div className="profile-info">
                        <p><strong>Nombre:</strong> {user.name.first} {user.name.last}</p>
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="logout-section">
                    <h2 className="logout-prompt">¿Cerrar sesión?</h2>
                    <button
                        type="button"
                        className="button logout-button"
                        onClick={logout}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </>
    );
}

export default Settings;
