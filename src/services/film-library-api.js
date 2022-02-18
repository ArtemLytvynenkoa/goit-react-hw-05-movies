const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c7ed46652640bc5a91d5a4e73d915c28';

async function fetchWithErrorHandling(url = '', ) {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopularMovies() {
  return fetchWithErrorHandling(`${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=1`);
}

export function fetchSearchMovies(query) {
  return fetchWithErrorHandling(`${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
}

export function fetchMovieById(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`);
}

export function fetchMoviesCast(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`);
}

export function fetchMoviesReviews(movieId) {
  return fetchWithErrorHandling(`${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
}
