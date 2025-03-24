import { errorMessage } from "../../js/tmdb";
import css from "./MovieList.module.css";
import { Link } from "react-router-dom";

function MovieList({ caption, movies, location, isLoading, error }) {
  const canDisplayMovies = !isLoading && !error;

  return (
    <div className={css.container}>
      {caption && <h2>{caption}:</h2>}
      {error && <h2>{errorMessage}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {canDisplayMovies && movies.length == 0 && <h2>Nothing found</h2>}
      {canDisplayMovies && movies.length > 0 && (
        <ul className="dotted-list">
          {movies.map((movie) => renderMovieItem(movie, location))}
        </ul>
      )}
    </div>
  );
}

function renderMovieItem(movie, location) {
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

export default MovieList;
