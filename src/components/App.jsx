//App
import { useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import { tempMovieData } from '../data/tempMovieData';
import Search from "./Search";
import NumResults from "./NumResults";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";
import MovieList from "./MovieList";



export default function App ()
{
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
