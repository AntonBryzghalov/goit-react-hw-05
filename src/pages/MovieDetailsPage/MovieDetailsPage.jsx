import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { errorMessage, getCoverImage, getMovieDetails } from "../../js/tmdb";
import { useEffect, useState } from "react";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

function MovieDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovieDetailsInternal() {
      setIsLoading(true);
      setError(false);
      setMovie(null);

      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetailsInternal();
  }, [movieId]);

  const goBack = () => navigate(location.state ?? "/movies");
  const getReleaseYear = (movie) => movie.release_date.substring(0, 4);
  const getScore = (movie) => movie["vote_average"] * 10;
  const getGenresString = (movie) => {
    const genres = movie.genres;
    return genres.length > 0
      ? genres.map((genre) => genre.name).join(", ")
      : "Not specified";
  };

  return (
    <>
      <button className={css.back} onClick={goBack}>
        Go back
      </button>
      <div className={css.container}>
        {error && <h2>{errorMessage}</h2>}
        {isLoading && <h2>Loading...</h2>}
        {movie && (
          <div className={css.info}>
            <div className={css.image}>
              <img src={getCoverImage(movie.poster_path)} alt="poster" />
            </div>
            <div className={css.description}>
              <h2>
                {movie.title} ({getReleaseYear(movie)})
              </h2>
              <p>User Score: {getScore(movie)}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{getGenresString(movie)}</p>
            </div>
          </div>
        )}
      </div>
      <div className={clsx(css.container, css.links)}>
        Additional information:
        <ul className="dotted-list">
          <li>
            <Link className="generic-link" to={`/movies/${movieId}/cast`}>
              Cast
            </Link>
          </li>
          <li>
            <Link className="generic-link" to={`/movies/${movieId}/reviews`}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default MovieDetailsPage;
