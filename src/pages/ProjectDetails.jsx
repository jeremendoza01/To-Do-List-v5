import { useParams } from 'react-router-dom';
import "../pages/styles/styles-ProjectDetails.css";
import Navbar from "../components/Navbar/Navbar";
import { useFetchProjectsById } from "../hooks/hookMyProjectsById";
import { useFetchEpics } from '../hooks/hookEpics';

const ProjectDetails = () => {
    const { projectId } = useParams();
    const { data: projectsData, loading } = useFetchProjectsById(projectId);
    const { data: projectsEpics } = useFetchEpics(projectId);

    return (
        <>
            <Navbar />
            <div className='container-project'>
                <h1>Detalles del proyecto</h1>
                {loading && <h3>Cargando detalles del proyecto...</h3>}

                {projectsData && (
                    <>
                        <div>
                            <h2 className='project-name'>{projectsData.name}</h2>
                            <p className='project-description'>{projectsData.description}</p>
                            <p className='project-members'>
                                Miembros del proyecto:
                                {projectsData.members.length > 0 ? (
                                    <ul>
                                        {projectsData.members.map((member, index) => (
                                            <li key={index}>{member}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No hay miembros en este proyecto.</span>
                                )}
                            </p>
                        </div>
                        <div className='project-epics'>
                            <h3>Epicas</h3>
                            {projectsEpics && (
                                <ul>
                                    {projectsEpics.map(projectsEpics => (
                                        <li key={projectsEpics.id}>{projectsEpics.name}</li>
                                    ))}
                                </ul>
                            )}

                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default ProjectDetails;
