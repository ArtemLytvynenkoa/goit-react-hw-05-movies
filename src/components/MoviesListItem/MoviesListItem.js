import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import s from './MoviesListItem.module.css';

function MoviesListItem({ title, id, url = "/movies", location }) {
    return (
        <li className={s.item}>
            <NavLink
                to={{
                    pathname: `${url}/${id}`,
                    state: {from: location}
                }}
                className={s.link}>
                {title}
            </NavLink>
        </li>
    )
}

MoviesListItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    url: PropTypes.string,
    location: PropTypes.shape().isRequired
}

export default MoviesListItem;