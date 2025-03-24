import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "../Navigation/Navigation";

function App() {
  const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
  const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
  const MovieDetailsPage = lazy(() =>
    import("../../pages/MovieDetailsPage/MovieDetailsPage")
  );
  const NotFoundPage = lazy(() =>
    import("../../pages/NotFoundPage/NotFoundPage")
  );

  const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
  const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

  return (
    <>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="/movies/:movieId/cast" element={<MovieCast />} />
            <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
