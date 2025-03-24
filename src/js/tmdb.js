import axios from "axios";

export const errorMessage =
  "There was an error. Try to update page a bit later";

const imdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2ZkNTNhNmYxN2U1OWYzYWM0YjNjNGNjMGMzYjlmZiIsIm5iZiI6MTc0MjY4Njk0OS41OTMsInN1YiI6IjY3ZGY0YWU1MzBlNjVlN2JlZWM3MDMzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I1z46PSFOAU3RMbZ6wnq9JRpBTY174Tn9QJw1rjs-sY",
  },
});

export async function getTrendingMovies() {
  const response = await imdbAPI.get("/trending/movie/day");
  return response.data;
}

export async function findMovies(query) {
  const response = await imdbAPI.get("/search/movie", {
    params: {
      query,
    },
  });
  return response.data;
}

export async function getMovieDetails(movie_id) {
  const response = await imdbAPI.get(`/movie/${movie_id}`);
  return response.data;
}

export async function getMovieCredits(movie_id) {
  const response = await imdbAPI.get(`/movie/${movie_id}/credits`);
  return response.data;
}

export async function getMovieReviews(movie_id) {
  const response = await imdbAPI.get(`/movie/${movie_id}/reviews`);
  return response.data;
}

export function getFullImageUrl(localPath) {
  return `https://image.tmdb.org/t/p/w500/${localPath}`;
}
