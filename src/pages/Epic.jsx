import { useParams } from "react-router-dom";
import { StoryCard } from "../components/StoryCard/StoryCard";
import "./styles/styles-Epic.css";
import Navbar from "../components/Navbar/Navbar";
import { useFetchEpicsById } from "../hooks/hookEpicsById";
import { useFetchStoriesEpic } from "../hooks/hookStoriesEpic";

export const Epic = () => {
    const { epicId, projectId } = useParams();
    const { data: epic, loading: loadingEpics } = useFetchEpicsById(epicId);
    const { data: storiesData = [], loading: loadingStories } = useFetchStoriesEpic(epicId);

    return (
        <>
            <Navbar />
            <div className="container-epic">
                <div className="div-epic">
                    <h1>Detalles de la epica</h1>
                    {loadingEpics && <p>Cargando detalles de la epica</p>}
                    {epic && (
                        <>
                            <h2>{epic.name} {epic.icon}</h2>
                            <p>descripcion: {epic.description}</p>
                        </>
                    )}
                </div>

                <div>
                    <h3>Historias:</h3>
                    {loadingStories ? <p>Cargando historias...</p> :
                        <ul className="link-story">
                            {storiesData.map(story =>
                                <StoryCard key={story._id} story={story} epicId={epicId} projectId={projectId} />
                            )}
                        </ul>
                    }
                </div>
            </div>
        </>
    );
};
