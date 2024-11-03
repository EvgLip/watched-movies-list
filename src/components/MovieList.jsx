//компонент MovieList
import { useState } from "react";
import { tempMovieData } from "../data/tempMovieData";
import Movie from "./Movie";

export default function MovieList ()
{
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list">
      {
        movies?.map((movie) =>
          <Movie movie={movie} key={movie.imdbID} />
        )
      }
    </ul>
  );
}