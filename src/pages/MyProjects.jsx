// import { useEffect, useState } from "react";
import ProjectCard from "../components/ProyectCard/ProyectCard";
import Navbar from "../components/Navbar/Navbar";
import "./styles/styles-MyProjects.css";
import { useFetchProjects } from '../hooks/hookMyProjects';

export const MyProjects = () => {

    const { data: projects, loading: loadingProjects } = useFetchProjects();

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Mis Proyectos</h2>
                <div>
                    {loadingProjects ? (
                        <p>Cargando proyectos...</p>
                    ) : projects && projects.length > 0 ? (
                        projects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    ) : (
                        <p>No hay proyectos</p>
                    )}
                </div>
            </div>
        </>
    );
};
