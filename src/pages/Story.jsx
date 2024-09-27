import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { useParams } from "react-router-dom";
import { TaskCard } from "../components/TaskCard/TaskCard";

export const Story = () => {
    const { storyId } = useParams();
    const { storiesData, tasksData, loading } = useContext(ProjectContext);

    const story = storiesData.find(story => story._id == storyId);

    if (!story) {
        return <h2>No se encontro la historia</h2>
    }
    return (
        <>
            <h1>Detalles de la historia</h1>
            {loading && <p>Cargando detalles de la historia</p>}
            <div>
                <h2>{story.name}</h2>
                <p>{story.description}</p>
            </div>
            <div>
                <h3>Tareas</h3>
                <ul>
                    {tasksData.filter(task => task.story === storyId).map(task => <TaskCard key={task._id} task={task} />)}
                </ul>
            </div>
        </>
    );
};

