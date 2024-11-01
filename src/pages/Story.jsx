import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarLogged from "../components/NavbarLogged/NavbarLogged";
import { useFetchStoryById } from "../hooks/hookStoriesById";
import { useFetchUsersById } from "../hooks/hookUsersById";
import { useFetchTasksStory } from "../hooks/hookTasksStory";
import { TaskList } from "../components/Task/TaskList";
import "./styles/styles-Story.css";
import { API_URL } from "../api";

export const Story = () => {
    const { storyId } = useParams();
    const { data: story, loading: loadingStory } = useFetchStoryById(storyId);
    const ownerId = useMemo(() => story?.owner, [story]);
    const assignedToIds = useMemo(() => story?.assignedTo || [], [story]);
    const { data: owner, loading: loadingOwner } = useFetchUsersById(ownerId);
    const { data: assigned, loading: loadingAssigned } = useFetchUsersById(assignedToIds);
    const { data: tasks, loading: loadingTasks, refetch } = useFetchTasksStory(storyId);

    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!storyId) {
            console.error("Error: ¡Story ID es necesario!");
            return;
        }

        const taskData = {
            name: newTaskName,
            description: newTaskDescription,
            story: storyId,
            created: new Date().toISOString(),
            due: null,
            done: false
        };

        try {
            const response = await fetch(`${API_URL}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    auth: localStorage.getItem('authToken'),
                },
                body: JSON.stringify(taskData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al agregar la tarea:", errorData);
                return;
            }

            // console.log("Tarea agregada con éxito");
            setShowAddTaskForm(false);
            setNewTaskName("");
            setNewTaskDescription("");
            refetch();

        } catch (error) {
            console.error("Error en la solicitud de agregar tarea", error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            try {
                const response = await fetch(`${API_URL}/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth': localStorage.getItem('authToken'),
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error al eliminar la tarea:", errorData);
                    return;
                }

                refetch();
                // console.log("Tarea eliminada");
            } catch (error) {
                console.error("Error al eliminar la tarea", error);
            }
        }
    };

    return (
        <>
            <NavbarLogged />
            <div className="container-story">
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
                        {/* TAREAS */}
                        <div className="div-historia">
                            <h3 className="h3-historia">Tareas de la historia</h3>
                            {loadingTasks ? (
                                <p>Cargando tareas...</p>
                            ) : tasks && tasks.length > 0 ? (
                                <>
                                    <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
                                    <button className="button-add-task" onClick={() => setShowAddTaskForm(true)}>Agregar Tarea</button>
                                </>
                            ) : (
                                <>
                                    <p>No hay tareas en esta historia</p>
                                    <button className="button-add-task" onClick={() => setShowAddTaskForm(true)}>Agregar Tarea</button>
                                </>
                            )}
                        </div>

                        {/* FORM AGREGAR TAREA */}
                        {showAddTaskForm && (
                            <form onSubmit={handleAddTask} className="form-add-task">
                                <h3 className="h3-addtask">Agregar Nueva Tarea</h3>
                                <input
                                    className="input-addtask"
                                    type="text"
                                    placeholder="Nombre de la tarea"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                    required
                                />
                                <input
                                    className="description-addtask"
                                    placeholder="Descripción de la tarea"
                                    value={newTaskDescription}
                                    onChange={(e) => setNewTaskDescription(e.target.value)}
                                    required
                                />
                                <div className="div-btn-add-task">
                                    <button type="submit" className="button-submit-task">Guardar</button>
                                    <button type="button" onClick={() => setShowAddTaskForm(false)} className="button-cancel-task">Cancelar</button>
                                </div>
                            </form>
                        )}

                    </div>
                ) : (
                    <p>Los datos de la historia no están disponibles</p>
                )}
            </div>
        </>
    );
};
