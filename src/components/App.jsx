import { useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import Search from "./Search";
import NumResults from "./NumResults";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import ErrorMassage from "./ErrorMassage";
import MovieDetails from "./MovieDetails";
import { useFetchMovie } from "./hooks/useFetchMovie";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

//App
export default function App ()
{
  const [query, setQuery] = useState('');
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], 'watched');
  const [selectedId, setSelectedId] = useState('');

  function handleOnSelectMovie (id)
  {
    setSelectedId(curId => curId === id ? null : id);
  }

  function handleOnClearDetails ()
  {
    setSelectedId(null);
  }

  function handlOnAddWatched (movie)
  {
    setWatched(watched => [...watched, movie]);
    //сохранение в localStorge перенесено в useEffect
    //здесь watched имеет устаревшее значение - оно обновиться при
    //следующем рендере
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched (id)
  {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  const { movies, isLoading, error } = useFetchMovie(query, handleOnClearDetails);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box >
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList
            movies={movies}
            onSelectedMovie={handleOnSelectMovie} />}
          {error && <ErrorMassage massage={error} />}
        </Box>

        <Box>
          {
            selectedId
              ? <MovieDetails
                selectedId={selectedId}
                watched={watched}
                onClearDetails={handleOnClearDetails}
                onAddWatched={handlOnAddWatched}
              />
              : <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
          }
        </Box>
      </Main>
    </>
  );
}
