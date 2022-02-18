import PropTypes from "prop-types";
import MoviesListItem from "../MoviesListItem/MoviesListItem";
import s from "./Movies.module.css"

function MoviesList({movies, url, location}) {
    return (
        <ul className={s.list}>
            {movies.map(({id, title}) => {
                return <MoviesListItem key={id} title={title} id={id} url={url} location={location}/>
            })}
        </ul> 
   ) 
}

MoviesList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired
    }))
}

export default MoviesList;