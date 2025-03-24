import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorMessage, getFullImageUrl, getMovieCredits } from "../../js/tmdb";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    async function getMovieDetailsInternal() {
      setIsLoading(true);
      setError(false);
      setCredits([]);

      try {
        const data = await getMovieCredits(movieId);
        console.log(data);
        setCredits(data.cast);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetailsInternal();
  }, [movieId]);

  const canDisplayCast = !error && !isLoading;

  return (
    <>
      {error && <h2>{errorMessage}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {canDisplayCast && credits.length === 0 ? (
        <div className={css.credits}>
          There is no info on cast for this movie.
        </div>
      ) : (
        <ul className={css.credits}>
          {credits.map((actorInfo) => renderCastItem(actorInfo))}
        </ul>
      )}
    </>
  );
}

function renderCastItem(actorInfo) {
  return (
    <li key={actorInfo.id} className={css["actor-info"]}>
      <img
        src={getFullImageUrl(actorInfo.profile_path)}
        alt={actorInfo.name}
        className={css.photo}
      />
      <div className={css.info}>
        <h3>{actorInfo.name}</h3>
        Character:
        <br />
        {actorInfo.character}
      </div>
    </li>
  );
}

export default MovieCast;
