import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorMessage, getMovieReviews } from "../../js/tmdb";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getMovieDetailsInternal() {
      setIsLoading(true);
      setError(false);
      setReviews([]);

      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetailsInternal();
  }, [movieId]);

  const canDisplayReviews = !error && !isLoading;

  return (
    <>
      {error && <h2>{errorMessage}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {canDisplayReviews && reviews.length === 0 ? (
        <div className={css.reviews}>
          We don&apos;t have any reviews for this movie.
        </div>
      ) : (
        <ul className={css.reviews}>
          {reviews.map((review) => printReviewItem(review))}
        </ul>
      )}
    </>
  );
}

function printReviewItem(review) {
  return (
    <li key={review.id} className={css.review}>
      <h3>Author: {review.author}</h3>
      <p>{review.content}</p>
    </li>
  );
}

export default MovieReviews;
