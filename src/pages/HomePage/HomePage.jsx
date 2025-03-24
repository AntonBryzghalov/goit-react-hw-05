import { getTrendingMovies } from "../../js/tmdb";
import MoviesList from "../../components/MoviesList/MoviesList";

function HomePage() {
  return <MoviesList caption="Trending movies" getMovies={getTrendingMovies} />;
}

export default HomePage;
