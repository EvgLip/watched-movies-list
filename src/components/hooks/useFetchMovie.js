import { useEffect, useState } from "react";
import { KEY } from "../../data/keyForFetch";
//выполнение запросов на выборку фильмов по условию из
//input Serch


export function useFetchMovie (query)
{
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function ()
    {
      const controller = new AbortController();


      if (query.length < 3)
      {
        setMovies([]);
        setError('');
        return;
      }

      fetcMovies();

      return () => controller.abort();

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

    }, [query]);

  return { movies, isLoading, error };
}