import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { useParams } from "react-router-dom";
import { TaskCard } from "../components/TaskCard/TaskCard";
import "./styles/styles-Story.css"
import Navbar from "../components/Navbar/Navbar";


export const Story = () => {
    const { storyId } = useParams();
    const { storiesData, tasksData, loading } = useContext(ProjectContext);

    const story = storiesData.find(story => story._id == storyId);

    if (!story) {
        return <h2>No se encontro la historia</h2>
    }
    return (
        <>
            <Navbar />
            <div className="container-story">
                <h1>Detalles de la historia</h1>
                {loading && <p>Cargando detalles de la historia</p>}
                <div>
                    <h3>{story.name}</h3>
                    <p>{story.description}</p>
                </div>
                <div>
                    <h3>Tareas:</h3>
                    <ul>
                        {tasksData.filter(task => task.story === storyId).map(task => <TaskCard key={task._id} task={task} />)}
                    </ul>
                </div>
            </div>
        </>
    );
};

