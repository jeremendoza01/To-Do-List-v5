import React, { useEffect } from 'react';
import './styles/styles-Home.css';
import Navbar from "../components/Navbar/Navbar";

const HomePage = () => {

    useEffect(() => {
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach((card, index) => {
            card.style.animation = `fadeIn 0.5s ease-out ${index * 0.3}s forwards`;
        });
    }, []);

    return (
        <div className="homepage-container">

            <Navbar />

            <main className="main-content">
                <section className="features">
                    <div className="feature-card hidden">
                        <h2>Organiza Tareas</h2>
                        <p>Crea listas de tareas personalizadas y clasifícalas por proyecto.</p>
                    </div>
                    <div className="feature-card hidden">
                        <h2>Seguimiento de Progreso</h2>
                        <p>Haz seguimiento de tu progreso en tiempo real y cumple tus plazos.</p>
                    </div>
                    <div className="feature-card hidden">
                        <h2>Reportes Detallados</h2>
                        <p>Genera reportes para ver el estado actual de cada proyecto.</p>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p>© 2024 Task Tracker Pro - Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default HomePage;
