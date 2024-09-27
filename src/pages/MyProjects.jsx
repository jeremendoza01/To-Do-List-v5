import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext"

import ProjectCard from "../components/ProyectCard/ProyectCard";
import Navbar from "../components/Navbar/Navbar"
import "../pages/styles/styles.css"




export const MyProjects = () => {

    const { projectsData, loading } = useContext(ProjectContext);

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Mis Proyectos</h2>
                <div>
                    {loading ? (
                        <h3>cargando proyectos</h3>
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