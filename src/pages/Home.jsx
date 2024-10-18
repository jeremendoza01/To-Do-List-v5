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
                        <h2 className='h2-home'>Organiza Tareas</h2>
                        <p className='p-home'>Crea listas de tareas personalizadas y clasifícalas por proyecto.</p>
                    </div>
                    <div className="feature-card hidden">
                        <h2 className='h2-home'>Seguimiento de Progreso</h2>
                        <p className='p-home'>Haz seguimiento de tu progreso en tiempo real y cumple tus plazos.</p>
                    </div>
                    <div className="feature-card hidden">
                        <h2 className='h2-home'>Reportes Detallados</h2>
                        <p className='p-home'>Genera reportes para ver el estado actual de cada proyecto.</p>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p className='p-footer'>© 2024 Task Tracker Pro - Todos los derechos reservados</p>
            </footer>
        </div>
    );
};

export default HomePage;
