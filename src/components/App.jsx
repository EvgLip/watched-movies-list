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
import { tempWatchedData } from '../data/tempWatchedData';
import Loader from "./Loader";
import ErrorMassage from "./ErrorMassage";
import MovieDetails from "./MovieDetails";
import { KEY } from "../data/key";



export default function App ()
{
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
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

  useEffect(
    function ()
    {
      async function fetcMovies ()
      {
        try
        {
          setIsLoading(true);
          setError('');

          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
          if (!res.ok) throw new Error(`${res.status}. ${res.statusText}`);

          const data = await res.json();
          if (data.Response === 'False') throw new Error(`Фильм не найден. (Причина: ${data?.Error})`);

          setMovies(data.Search);
        }
        catch (err) 
        {
          setError(err.message);
        }
        finally 
        {
          setIsLoading(false);
        }
      };

      if (query.length < 3)
      {
        setMovies([]);
        setError('');
        return;
      }
      fetcMovies();

    }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box classExt="btn-left">
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
                onClearDetails={handleOnClearDetails}
              />
              : <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} />
              </>
          }
        </Box>
      </Main>
    </>
  );
}
