//App
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import Search from "./Search";
import NumResults from "./NumResults";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
// import { tempMovieData } from '../data/tempMovieData';
// import { tempWatchedData } from '../data/tempWatchedData';
import Loader from "./Loader";
import ErrorMassage from "./ErrorMassage";
import MovieDetails from "./MovieDetails";
import { KEY } from "../data/key";



export default function App ()
{
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(
    function ()
    {
      const storedValue = localStorage.getItem('watched');
      return JSON.parse(storedValue);
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

  //выполнение запросов на выборку фильмов по условию из
  //input Serch
  useEffect(
    function ()
    {
      const controller = new AbortController();
      async function fetcMovies ()
      {
        try
        {
          setIsLoading(true);
          setError('');

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error(`${res.status}. ${res.statusText}`);

          const data = await res.json();
          if (data.Response === 'False') throw new Error(`Фильм не найден. (Причина: ${data?.Error})`);

          setMovies(data.Search);
          setError('');
        }
        catch (err) 
        {
          if (err.name !== 'AbortError') 
          {
            setError(err.message);
          }
        }
        finally 
        {
          setIsLoading(false);
        }
      };

      handleOnClearDetails();
      if (query.length < 3)
      {
        setMovies([]);
        setError('');
        return;
      }

      fetcMovies();

      return function ()
      {
        controller.abort();
      };

    }, [query]);

  //помещение watched в localStorage
  useEffect(function ()
  {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

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
