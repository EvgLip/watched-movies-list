// детали фильма

import { useEffect, useState } from "react";
import { KEY } from "../data/key";
import StarRating from "./StarRating";
import Loader from "./Loader";
import ErrorMassage from "./ErrorMassage";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

export default function MovieDetails ({ selectedId, onClearDetails })
{
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
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

  console.log('movieDetails ', movieDetails);
  console.log('err ', error);

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
            <img src={poster} alt={`Poster of ${movieDetails} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={22}
              />
            </div>
            <p><em>{plot}</em></p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      }
    </div>
  );
}

