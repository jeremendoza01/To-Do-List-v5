// import React from "react";
import { Link } from "react-router-dom";
// import styles from "./storyCard.module.css";

export const StoryCard = ({ story, projectId, epicId }) => {
    return (
        <Link
            to={`/my-projects/${projectId}/${epicId}/${story._id}`}
            className="link">
            <div className="story-card">
                <p className="name">Nombre: {story.name}</p>
                <p className="description">
                    Descripcion: {story.description}
                </p>
            </div>
        </Link>
    );
};