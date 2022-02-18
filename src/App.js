import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from "./components/AppBar";
import Container from "./components/Container";
import Loader from "./components/Loader";

const HomeView = lazy(() => import('./views/HomeView'  /* webpackChunkName "HomeView" */))
const MoviesDetailsView = lazy(() => import('./views/MoviesDetailsView'  /* webpackChunkName "MoviesDetailsView" */))
const MoviesView = lazy(() => import('./views/MoviesView'  /* webpackChunkName "MoviesView" */))

function App() {
  return (
    <Container>
      <AppBar />
      
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route exact path="/">
            <HomeView />
          </Route>

          <Route exact path="/movies">
            <MoviesView />
          </Route>

          <Route path="/movies/:movieId">
            <MoviesDetailsView/>
          </Route>

          <Route >
            <HomeView />
          </Route>

        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
