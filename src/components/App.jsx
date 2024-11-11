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
  //кастомный хук для извлечения данных
  const { movies, isLoading, error } = useFetchMovie(query, handleOnClearDetails);

  //выбор фильма из списка запроса (левый список) 
  //для запроса на детальное описание (правая часть UI)
  function handleOnSelectMovie (id)
  {
    setSelectedId(curId => curId === id ? null : id);
  }
  //очистка окна детализации фильма (правая часть UI)
  function handleOnClearDetails ()
  {
    setSelectedId(null);
  }
  //добавление фильма в список просмотренных
  function handlOnAddWatched (movie)
  {
    setWatched(watched => [...watched, movie]);
    //сохранение в localStorge перенесено в useLocalStorageState
    //здесь watched имеет устаревшее значение - оно обновиться при
    //следующем рендере
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }
  //удаление фильма из списка просмотренных
  function handleDeleteWatched (id)
  {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

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
