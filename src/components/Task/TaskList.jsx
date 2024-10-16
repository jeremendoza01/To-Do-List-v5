import React from 'react'

import { TaskCard } from '../TaskCard/TaskCard';

export const TaskList = ({ tasks }) => {
    return tasks.length > 0 ? (
        <div>
            <ul>
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                    />
                ))}
            </ul>
        </div>
    ) : (
        <p>Aun no hay tareas</p>
    );
}