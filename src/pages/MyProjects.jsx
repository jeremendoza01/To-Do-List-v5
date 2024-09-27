import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext"

import ProjectCard from "../components/ProyectCard/ProyectCard";
import Navbar from "../components/Navbar/Navbar"
import "./styles/styles-MyProjects.css"




export const MyProjects = () => {

    const { projectsData, loading } = useContext(ProjectContext);

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Mis Proyectos</h2>
                <div>
                    {loading ? (
                        <p>Cargando proyectos..</p>
                    ) : (
                        projectsData.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};