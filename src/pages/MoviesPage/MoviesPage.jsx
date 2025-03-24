import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { findMovies as findMoviesBy } from "../../js/tmdb";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  useEffect(() => {
    async function getMoviesInternal() {
      setIsLoading(true);
      setError(false);
      setMovies([]);

      try {
        if (searchQuery.length === 0) return;
        const data = await findMoviesBy(searchQuery);
        setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMoviesInternal();
  }, [searchQuery]);

  function handleSubmit(event) {
    event.preventDefault();
    const query = event.target.search.value.trim();
    event.target.reset();
    if (!query || query.length === 0) {
      toast.error("Please enter something to search for", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set("search", query);
    setSearchParams(newParams);
  }

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
      {searchQuery.length > 0 && (
        <MovieList
          caption={`Search results for "${searchQuery}"`}
          movies={movies}
          location={location}
          isLoading={isLoading}
          error={error}
        />
      )}
    </>
  );
}

export default MoviesPage;
