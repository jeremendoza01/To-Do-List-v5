import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import { useFetchStoryById } from "../hooks/hookStoriesById";
import { useFetchUsersById } from "../hooks/hookUsersById";
import { useFetchTasksStory } from "../hooks/hookTasksStory";
import { TaskList } from "../components/Task/TaskList";
import "./styles/styles-Story.css";

export const Story = () => {
    const { storyId } = useParams();
    const { data: story, loading: loadingStory } = useFetchStoryById(storyId);
    const ownerId = useMemo(() => story?.owner, [story]);
    const assignedToIds = useMemo(() => story?.assignedTo || [], [story]);
    const { data: owner, loading: loadingOwner } = useFetchUsersById(ownerId);
    const { data: assigned, loading: loadingAssigned } = useFetchUsersById(assignedToIds);
    const { data: tasks, loading: loadingTasks, refetch: refetchTasks } = useFetchTasksStory(storyId);

    const [selectedTask, setSelectedTask] = useState(null);

    // agregar una tarea
    const handleAddTask = () => {
        //formulario para agregar la tarea
        console.log("Agregar tarea");
    };

    //modificar una tarea
    const handleEditTask = (task) => {
        setSelectedTask(task);
        //formulario para editar la tarea
        console.log("Modificar tarea", task);
    };

    //eliminar una tarea
    const handleDeleteTask = async (taskId) => {

        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            try {
                await fetch(`${API_URL}/tasks/${taskId}`, { method: 'DELETE' });
                refetchTasks();
                console.log("Tarea eliminada");
            } catch (error) {
                console.error("Error al eliminar la tarea", error);
            }
        }
    };

    return (
        <>
            <NavbarLogged />
            <div className="container">
                <h1 className="h1-detalles">Detalles de la historia</h1>
                {loadingStory ? (
                    <p>Cargando detalles de la historia...</p>
                ) : story ? (
                    <div>
                        <h2 className="h2-name">{story.name} {story.icon}</h2>
                        <p className="p-descripcion"><b>Descripción:</b> {story.description}</p>
                        <div className="details-grid">
                            <div className="div-property">
                                <b className="text-propietario">Propietario:</b>
                                {loadingOwner ? (
                                    <p>Cargando propietario...</p>
                                ) : owner && owner.length > 0 && owner[0]?.name ? (
                                    <span className="text-propietario">{owner[0].name.first} {owner[0].name.last}</span>
                                ) : (
                                    <span>No se encontró el propietario</span>
                                )}
                                <p className="p-estado"><b>Estado:</b> {story.status}</p>
                                <p className="p-estado"><b>Puntos:</b> {story.points !== null ? story.points : 'Sin puntos asignados'}</p>
                            </div>
                            <div className="div-data-story">
                                <span className="text-fecha"><b>Fecha de creación:</b> {new Date(story.created).toLocaleDateString()}</span>
                                <p className="p-estado"><b>Inicio:</b> {story.started ? new Date(story.started).toLocaleDateString() : "No iniciado"}</p>
                                <p className="p-estado"><b>Finalización:</b> {story.finished ? new Date(story.finished).toLocaleDateString() : 'No finalizado'}</p>
                            </div>
                            <div className="div-users">
                                <b className="text-users">Usuarios asignados a esta historia:</b>
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
                        </div>
                        <div className="div-historia">
                            <h3 className="h3-historia">Tareas de la historia</h3>
                            {loadingTasks ? (
                                <p>Cargando tareas...</p>
                            ) : tasks && tasks.length > 0 ? (
                                <>
                                    <TaskList
                                        tasks={tasks}
                                        onEditTask={handleEditTask} // Pasar la función para editar
                                        onDeleteTask={handleDeleteTask} // Pasar la función para eliminar
                                    />
                                    <button className="button-add-task" onClick={handleAddTask}>Agregar Tarea</button>
                                </>
                            ) : (
                                <>
                                    <p>No hay tareas en esta historia</p>
                                    <button className="button-add-task" onClick={handleAddTask}>Agregar Tarea</button>
                                </>
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
