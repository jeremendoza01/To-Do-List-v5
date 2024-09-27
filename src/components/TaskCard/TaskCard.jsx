
// import styles from './taskCard.module.css'
export const TaskCard = ({ task }) => {
    return (
        <div className='task-card'>
            <h2 className='name'>Nombre de la tarea: {task.name} </h2>
            <h3 className='description'>Descripcion de tarea: {task.description}</h3>
            <p className='status-task'>Estado: {task.done ? 'Completa' : 'Incompleta'} </p>
        </div>
    )
}
