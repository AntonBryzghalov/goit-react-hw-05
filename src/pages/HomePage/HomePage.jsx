import { useLocation } from "react-router-dom";
import { getTrendingMovies } from "../../js/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";

function HomePage() {
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
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesInternal();
  }, []);

  return (
    <MovieList
      caption="Trending movies"
      movies={movies}
      location={location}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default HomePage;
