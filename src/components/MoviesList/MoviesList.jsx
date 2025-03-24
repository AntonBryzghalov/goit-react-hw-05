import { useEffect, useState } from "react";
import { errorMessage } from "../../js/tmdb";
import css from "./MoviesList.module.css";
import { Link, useLocation } from "react-router-dom";

function MoviesList({ caption, getMovies, showHelpers = true }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMoviesInternal() {
      setIsLoading(true);
      setError(false);
      setMovies([]);

      try {
        const data = await getMovies();
        setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesInternal();
  }, [getMovies]);

  const canDisplayMovies = !isLoading && !error;

  return (
    <div className={css.container}>
      {caption && <h2>{caption}:</h2>}
      {error && <h2>{errorMessage}</h2>}
      {showHelpers && isLoading && <h2>Loading...</h2>}
      {showHelpers && canDisplayMovies && movies.length == 0 && (
        <h2>Nothing found</h2>
      )}
      {canDisplayMovies && movies.length > 0 && (
        <ul className="dotted-list">
          {movies.map((movie) => printMovieItem(movie, location))}
        </ul>
      )}
    </div>
  );
}

function printMovieItem(movie, location) {
  return (
    <li key={movie.id}>
      <Link
        className="generic-link"
        to={`/movies/${movie.id}`}
        state={location}
      >
        {movie.title}
      </Link>
    </li>
  );
}

export default MoviesList;
