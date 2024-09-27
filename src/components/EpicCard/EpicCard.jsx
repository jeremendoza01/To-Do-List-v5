import { Link } from "react-router-dom"

export const EpicCard = ({ epic }) => {

    return (
        <Link
            to={`/my-projects/${epic.project}/${epic._id}`}
            className='epic-link'>
            <div className='card-epic'>
                <h2 className="name-epic">Nombre de epica: {epic.name}</h2>
                <p className="description-epic">
                    Descripcion: {epic.description}
                </p>
                <p className="icon-epic">Icono: {epic.icon}</p>
            </div>
        </Link>
    );


}
