// детали фильма

import { useEffect, useState } from "react";
import { KEY } from "../data/key";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMassage from "./ErrorMassage";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export default function MovieDetails ({ selectedId, watched, onClearDetails, onAddWatched })
{
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);

  const isWatched = watched.some(cur => cur.imdbID === selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movieDetails;

  useEffect(function ()
  {
    async function getMovieDetails ()
    {
      try
      {
        setIsLoading(true);
        setError('');

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
        if (!res.ok) throw new Error(`${res.status}. ${res.statusText}`);

        const data = await res.json();
        if (data.Response === 'False') throw new Error(`Фильм не найден. (Причина: ${data?.Error})`);

        setMovieDetails(data);
      }
      catch (err) 
      {
        setError(err.message);
      }
      finally 
      {
        setIsLoading(false);
      }
    }

    getMovieDetails();

  }, [selectedId]);

  useEffect(
    function ()
    {
      if (!Title) return;
      document.title = `Movie | ${Title}`;

      return function ()
      {
        document.title = 'Use Popcorn';
        console.log('cleaner ', Title);
      };
    }, [Title]
  );

  function handlOnAddWatched ()
  {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      Runtime: Runtime.split(' ').at(0),
      imdbRating: imdbRating,
      userRating: rating,
    };
    console.log(newWatchedMovie);

    onAddWatched(newWatchedMovie);
    onClearDetails();
  }


  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMassage massage={error} />}
      {!isLoading && !error &&
        <>
          <header>
            <button className="btn-back" onClick={onClearDetails}>
              <FaRegArrowAltCircleLeft />
            </button>
            <img src={Poster} alt={`Poster of ${movieDetails} movie`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched
                ? <>
                  <StarRating
                    maxRating={10}
                    size={22}
                    onChangeReting={setRating}
                  />
                  {
                    rating > 0 &&
                    <button
                      className="btn-add"
                      onClick={handlOnAddWatched}
                    >
                      + Add to list
                    </button>
                  }
                </>
                : <p>You rated with movie {watchedUserRating} <span>🌟</span></p>
              }
            </div>
            <p>Plot:   <em>{Plot}</em></p>
            <p>Starring:   {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      }
    </div>
  );
}

