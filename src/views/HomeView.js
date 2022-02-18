import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import MoviesList from '../components/MoviesList';
import PageHeading from '../components/PageHeading';
import * as filmLibraryApi from '../services/film-library-api';
import getStateMachineStatus from '../services/getStateMachineStatus';

const STATUS = getStateMachineStatus();

export default function HomeView() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState('')

  useEffect(() => {
    setStatus(STATUS.PENDING);

    filmLibraryApi.fetchPopularMovies()
      .then(({ results }) => {
        setMovies(results.map(({ id, title }) => ({ id, title })));
        setStatus(STATUS.RESOLVE);
      })
      .catch(error => {
        setError(error.message);
        setStatus(STATUS.REJECT);
      })
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />
      {status === STATUS.RESOLVE &&
        <MoviesList
          movies={movies}
          location={location}
        />
      }

      {status === STATUS.PENDING && <Loader />}
      
      {status === STATUS.REJECT && <h2>{error}</h2>}
    </>
  );
}
