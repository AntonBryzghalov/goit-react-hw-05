import { useState } from "react";
import css from "./MoviesPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import { findMovies as findMoviesBy } from "../../js/tmdb";
import MoviesList from "../../components/MoviesList/MoviesList";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  async function searchMovies() {
    if (searchQuery.length === 0) return { results: [] };
    return await findMoviesBy(searchQuery);
  }

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

    setSearchQuery(query);
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
      <MoviesList
        caption={
          searchQuery.length > 0 ? `Search results for "${searchQuery}"` : null
        }
        getMovies={searchMovies}
        showHelpers={searchQuery.length > 0}
      />
    </>
  );
}

export default MoviesPage;
