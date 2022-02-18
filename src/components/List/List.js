import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as filmLibraryApi from "../../services/film-library-api";
import getStateMachineStatus from '../../services/getStateMachineStatus';
import Loader from '../Loader';
import s from "./List.module.css";

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_IMG = 'data:image/png;base64,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';
const STATUS = getStateMachineStatus();

function List({ movieId, details }) {
    const [filmsDetails, setFilmDetails] = useState([]);
    const [error, setError] = useState("");
    const [status, setStatus] = useState(STATUS.IDLE);

    useEffect(() => {
        setFilmDetails([]);
        setError('');
        setStatus(STATUS.PENDING);
        
        if (details === 'cast') {
            filmLibraryApi.fetchMoviesCast(movieId)
                .then(({ cast }) => {
                    setFilmDetails(
                        cast.map(({ character, name, profile_path, id }) => ({ character, name, img: profile_path, id }))
                    );
                    setStatus(STATUS.RESOLVE);
                })
                .catch(error => {
                    setError(error.message);
                    setStatus(STATUS.REJECT)
                })
            return
        };

        if (details === 'reviews') {
            
            filmLibraryApi.fetchMoviesReviews(movieId)
                .then(({ results }) => {
                    if (results.length === 0) {
                        return Promise.reject(new Error('We don`t have any reviews for this movie.'))
                    }

                    setFilmDetails(
                        results.map(({ author, content, id }) => ({ author, review: content, id }))
                    );
                    setStatus(STATUS.RESOLVE);
                })
                .catch(error => {
                    setError(error.message);
                    setStatus(STATUS.REJECT);
                })
            return
        };
        
    }, [details, movieId]);

    return (
        <>
            {status === STATUS.RESOLVE &&
                <ul className={details !== 'cast' ? s.list : s.cast_list}>
                    {filmsDetails.map(detail => {
                        const { character, name, img, id, author, review } = detail;

                        return (
                            <li key={id} className={details !== 'cast' ? s.item : s.cast_item}>
                                {details === 'cast' &&
                                    <div className={s.cast_box}>
                                    <img
                                        src={img ? `${BASE_IMAGE_URL}${img}` : `${DEFAULT_IMG}`}
                                        alt={name} width='200'
                                        className={s.img}
                                    />
                                    <h3 className={s.name}>{name}</h3>
                                    <p className={s.text}>Character: {character}</p>
                                    </div>
                                }
                            
                                {details === 'reviews' && filmsDetails.length !== 0 &&
                                    <>
                                        <h3 className={s.name}>{author}</h3>
                                        <p className={s.text}>{review}</p>
                                    </>
                                }
                            </li>
                        )
                    })}

                </ul>
            }

            {status === STATUS.REJECT && <h2>{error}</h2>}
            {status === STATUS.PENDING && <Loader/>}
        </>
    )
}

List.propTypes = {
    movieId: PropTypes.string.isRequired,
    details: PropTypes.oneOf(['reviews', 'cast']).isRequired
}

export default List;