import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useFetchStoryById } from "../hooks/hookStoriesById";
import { useFetchUsersById } from "../hooks/hookUsersById";
import { useFetchTasksStory } from "../hooks/hookTasksStory";
import { TaskList } from "../components/Task/TaskList";
import "./styles/styles-Story.css";

export const Story = () => {
    const { storyId } = useParams();
    const { data: story, loading: loadingStory } = useFetchStoryById(storyId)

    const ownerId = useMemo(() => story?.owner, [story]);
    const assignedToIds = useMemo(() => story?.assignedTo || [], [story]);

    const { data: owner, loading: loadingOwner } = useFetchUsersById(ownerId)
    const { data: assigned, loading: loadingAssigned } = useFetchUsersById(assignedToIds)
    const { data: tasks, loading: loadingTasks } = useFetchTasksStory(storyId)


    return (
        <>
            <Navbar />
            <div className="container">
                <h1>Detalles de la historia</h1>
                {loadingStory ? (
                    <p>Cargando detalles de la historia...</p>
                ) : story ? (
                    <div>
                        <div>
                            <h2>{story.name} {story.icon}</h2>
                            <p><b>Descripción:</b> {story.description}</p>
                        </div>
                        <div className="div-property">
                            <b>Propietario: </b>
                            {loadingOwner ? (
                                <p>Cargando propietario...</p>
                            ) : owner && owner.length > 0 && owner[0]?.name ? (
                                <span>{owner[0].name.first} {owner[0].name.last}</span>
                            ) : (
                                <span>No se encontró el propietario</span>
                            )}
                            <p><b>Estado:</b> {story.status}</p>
                            <p><b>Puntos:</b> {story.points !== null ? story.points : 'Sin puntos asignados'}</p>
                        </div>
                        <div className="div-data-story">
                            <span><b>Fecha de creación:</b> {new Date(story.created).toLocaleDateString()}</span>
                            <p><b>Inicio:</b> {story.started ? new Date(story.started).toLocaleDateString() : "No iniciado"}</p>
                            <p><b>Finalización:</b> {story.finished ? new Date(story.finished).toLocaleDateString() : 'No finalizado'}</p>
                        </div>
                        <div className="div-users">
                            <b>Usuarios asignados a esta historia:</b>
                            {loadingAssigned ? (
                                <p>Cargando asignados...</p>
                            ) : assigned && assigned.length > 0 ? (
                                <ul>
                                    {assigned.map(user => (
                                        <li key={user._id}>{user.name.first} {user.name.last}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay usuarios asignados</p>
                            )}
                        </div>
                        <div className="div-historias">

                            <h3 className="h3-historia">Tareas de la historia</h3>


                            {loadingTasks ? (
                                <p>Cargando tareas...</p>
                            ) : tasks && tasks.length > 0 ? (
                                <TaskList tasks={tasks} />
                            ) : (
                                <p>No hay tareas en esta historia</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p>Los datos de la historia no están disponibles</p>
                )}
            </div>
        </>
    );
};
