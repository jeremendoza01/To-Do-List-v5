import React from 'react'
// import  "../"
import { TaskCard } from '../TaskCard/TaskCard';

export const TaskList = ({ tasks }) => {
    return tasks.length > 0 ? (
        <div>
            <ul>
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                    /*                 toggleTask={toggleTask}
                                    handleDelete={handleDelete} */
                    />
                ))}
            </ul>
        </div>
    ) : (
        <p>Aun no hay tareas</p>
    );
}