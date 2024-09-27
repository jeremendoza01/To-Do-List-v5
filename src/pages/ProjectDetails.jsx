import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import { EpicCard } from '../components/EpicCard/EpicCard';
import "../pages/styles/styles-ProjectDetails.css"
import Navbar from "../components/Navbar/Navbar";


const ProjectDetails = () => {

    const { projectId } = useParams();

    const { projectsData, loading, epicsData } = useContext(ProjectContext);

    const project = projectsData.find((project) => project._id === projectId);

    return (
        <>
            <Navbar />
            <div className='container-project'>
                <h1>Detalles del proyecto</h1>
                {loading && <h3>Cargando detalles del proyecto...</h3>}

                {project && (
                    <>
                        <div>
                            <h2 className='project-name'>{project.name}</h2>
                            <p className='project-description'>
                                {project.description}
                            </p>
                            <p className='project-members'>
                                Miembros del proyecto: {project.members.join(', ')}
                            </p>
                        </div>
                        <div className='project-epics'>
                            <h3>Epicas</h3>
                            <ul>
                                {epicsData
                                    .filter((epic) => epic.project === projectId)
                                    .map((epic) => (
                                        <EpicCard key={epic._id} epic={epic} />
                                    ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </>
    );

}

export default ProjectDetails