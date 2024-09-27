
import "./styles.TaskCard.css"
export const TaskCard = ({ task }) => {
    return (
        <div className='task-card'>
            <h2 className='name'>{task.name} </h2>
            <h3 className='description'>{task.description}</h3>
            <p className='status-task'>{task.done ? "Completa" : "Incompleta"} </p>
        </div>
    )
}
