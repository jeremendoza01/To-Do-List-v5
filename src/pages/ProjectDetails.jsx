import { useParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import "../pages/styles/styles-ProjectDetails.css";
import Navbar from "../components/Navbar/Navbar";
import { useFetchProjectsById } from "../hooks/hookMyProjectsById";
import { useFetchEpics } from '../hooks/hookEpics';
import { useFetchUsersById } from "../hooks/hookUsersById";
import { EpicCard } from "../components/EpicCard/EpicCard"

const ProjectDetails = () => {
    const { projectId } = useParams();

    const { data: project, loading } = useFetchProjectsById(projectId);

    const membersIds = useMemo(() => {
        return project && project.members ? project.members : [];
    }, [project]);

    const { data: owner, loading: loadingOwner } = useFetchUsersById(project?.owner);

    const { data: members, loading: loadingMembers } = useFetchUsersById(membersIds);

    const { data: epics, loading: loadingEpics } = useFetchEpics(projectId);

    return (
        <>
            <Navbar />
            <div className='container-project'>
                <h1>Detalles del proyecto</h1>
                {loading && <h3>Cargando detalles del proyecto...</h3>}

                {project && (
                    <>
                        <div>
                            <h2 className='project-name'>{project.name} {project.icon}</h2>
                            <p className='project-description'>{project.description}</p>

                            <div className='div-property'>
                                <p className='project-property'>Propietario:</p>
                                {loadingOwner ? 'Cargando propietario...' :
                                    owner && owner.length > 0 && owner[0]?.name
                                        ? <span className='project-owner-name'>{owner[0].name.first} {owner[0].name.last}</span>
                                        : 'No se encontró al propietario'
                                }
                            </div>


                            <div className="project-members">
                                <h3>Miembros</h3>
                                {loadingMembers ? <p>Cargando miembros...</p> :
                                    members && members.length > 0 ?
                                        <ul>
                                            {members.map(member => <li key={member._id}>{member.name.first} {member.name.last}</li>)}
                                        </ul>
                                        : <p>No hay miembros en este proyecto</p>
                                }
                            </div>

                        </div>
                        <div className='project-epics'>
                            <h3 className='h3-epicas'>Epicas</h3>
                            {
                                loadingEpics ? <p>Cargando epicas...</p> :
                                    epics && epics.length > 0 ?
                                        <ul>
                                            {epics.map(epic => <EpicCard key={epic._id} epic={epic} />)}
                                        </ul> : <p>Este proyecto no tiene epicas</p>
                            }
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ProjectDetails;
