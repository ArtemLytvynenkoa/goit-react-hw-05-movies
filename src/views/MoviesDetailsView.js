import { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Switch, useParams, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import FilmsCard from '../components/FilmsCard/FilmsCard';
import Loader from '../components/Loader';
import * as filmLibraryApi from '../services/film-library-api';
import getStateMachineStatus from '../services/getStateMachineStatus';

const List = lazy(() => import('../components/List'  /* webpackChunkName "List" */));

const STATUS = getStateMachineStatus();
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
const DEFAULT_IMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Kf9kZ-VRf0wuP6QnKdra9fDBeqafqtjEas8WL2fwQdO0OZAG7AXN0wJZ9AkwQH2qL30&usqp=CAU';

export default function MoviesDetailsView() {
    const history = useHistory();
    const location = useLocation();
    const { movieId } = useParams();
    const { url, path } = useRouteMatch();
    const [moviesDetails, setMoviesDetails] = useState({});
    const [status, setStatus] = useState(STATUS.IDLE);
    const [error, setError] = useState('')

    useEffect(() => {
        setStatus(STATUS.PENDING)
        filmLibraryApi.fetchMovieById(movieId)
            .then(({ genres, overview, title, vote_average, poster_path, release_date }) => {
                setMoviesDetails(() => {
                    return {
                        genres: genres.map(({ name }) => name).join(" "),
                        overview,
                        title,
                        score: `${vote_average * 10}%`,
                        img: poster_path ? `${BASE_IMAGE_URL}${poster_path}` : `${DEFAULT_IMG}`,
                        release: release_date.slice(0, 4)
                    }
                });
                setStatus(STATUS.RESOLVE);
            })
            .catch(error => {
                setError(error.message);
                setStatus(STATUS.REJECT)
            })
    }, [movieId]);

    const onGoBack = () => {
        history.push(location?.state?.from ?? '/')
    }

    return (
        <>
           {status === STATUS.RESOLVE &&
             <>
                <FilmsCard
                    propsForRender={moviesDetails}
                    url={url}
                    onClick={onGoBack}
                    location={location}
                />
                <Suspense fallback={<Loader/>}>
                    <Switch>
                        <Route path={`${path}/cast`} exact>
                            <List movieId={movieId} details="cast"/>
                        </Route>

                        <Route path={`${path}/reviews`}>
                            <List movieId={movieId} details="reviews"/>
                        </Route>
                    </Switch>
                </Suspense>
             </>
            }
            {status === STATUS.PENDING && <Loader />}
            {status === STATUS.REJECT && <h2>{error}</h2>}
        </>
    );
}