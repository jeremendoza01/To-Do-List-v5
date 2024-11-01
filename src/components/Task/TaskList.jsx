import React from "react";
import "./TaskList.css";

export const TaskList = ({ tasks, onDeleteTask }) => {
    return (
        <div className="task-list-container">
            <ul>
                {tasks.map(task => (
                    <li key={task._id} className="task-item">
                        <span className="task-name">{task.name}</span>
                        <div className="task-buttons">
                            <button className="button-delete" onClick={() => onDeleteTask(task._id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
