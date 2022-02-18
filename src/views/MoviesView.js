import { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import MoviesList from "../components/MoviesList";
import * as filmLibraryApi from "../services/film-library-api";
import getStateMachineStatus from '../services/getStateMachineStatus';

const STATUS = getStateMachineStatus();

export default function MoviesView() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const selectedQuery = new URLSearchParams(location.search).get('query');
  const [value, setValue] = useState('');
  const [query, setQuery] = useState(selectedQuery ?? '');
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);

  useEffect(() => {
    if (query === '') {
      return
    }

    setStatus(STATUS.PENDING);

    filmLibraryApi.fetchSearchMovies(query)
      .then(({ results }) => {
        if (results.length === 0) {
          return Promise.reject(new Error('Not found'))
        }
        
        setMovies(results.map(({ id, title }) => ({ id, title })));
        setStatus(STATUS.RESOLVE);
        history.push({
        // ...location,
        search: `?query=${query}`
        })
      })
      .catch(error => {
        setError(error.message);
        
        setStatus(STATUS.REJECT);
      })
  }, [history, query]);

  const handleChange = e => {
    setValue(e.currentTarget.value.toLowerCase().trim())
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (value === '') {
      return alert("Enter something!")
    }

    setQuery(value)
    
    setValue('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={value}/>
        <button type="submit">Search</button>
      </form>
      
      {status === STATUS.REJECT && <h2>{error}</h2>}
      {status === STATUS.RESOLVE &&
        <MoviesList
          movies={movies}
          url={url}
          location={location}
        />
      }
      {status === STATUS.PENDING && <Loader/>}
    </>
  );
}