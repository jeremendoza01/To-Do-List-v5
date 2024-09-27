import { Link } from 'react-router-dom'
// import styles from './projectCard.module.css'

const ProyectCard = ({ project }) => {
    return (
        <>
            <div>
                <Link to={`/my-projects/${project._id}`} className='link-project'>
                    <div className='card-project'>
                        <h2>{project.name}</h2>
                    </div>
                </Link>
            </div >

        </>
    )
}

export default ProyectCard