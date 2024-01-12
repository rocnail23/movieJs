import fetchUrl from "./helper/fetch";

export const state = {
  movie: {},
  movies: {},
  recomendations: { similar: {}, popular: {}, upcoming: {} },
  page: 1,
  timeOut: null,
};

export async function getMovie(id) {
  console.log("ap");
  const data = await fetchUrl(`https://api.themoviedb.org/3/movie/${id}`);
  setMovie(data);
  await getVideo(data.id);
}

export function setTime(timeOut) {
  state.timeOut = timeOut;
}

function setMovie(movie) {
  movie = {
    id: movie.id,
    title: movie.original_title,
    overview: movie.overview,
    image: movie.backdrop_path,
    popularity: movie.popularity,
    voteAverage: movie.vote_average / 2,
  };

  state.movie = { ...movie };
}

function setMovies(movies) {
  movies = movies.map((movie) => ({
    id: movie.id,
    poster: movie.poster_path,
  }));

  state.movies = movies;
}

export async function getMovies(param, page = state.page) {
  let url;

  if (param) {
    url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${param}`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&include_video=true`;
  }

  try {
    const data = await fetchUrl(url);

    const movies = data.results;
    setMovie(movies[0]);
    await getVideo(movies[0].id);
    setMovies(movies);
  } catch (error) {
    throw error;
  }
}

export async function getRecomendations(id = state.movie.id) {
  let resSimilar = fetchUrl(`https://api.themoviedb.org/3/movie/${id}/similar`);
  let resPopular = fetchUrl("https://api.themoviedb.org/3/movie/popular");
  let resUpcoming = fetchUrl("https://api.themoviedb.org/3/movie/upcoming");

  const recomendations = await Promise.all([
    resSimilar,
    resPopular,
    resUpcoming,
  ]);

  recomendations.forEach((rec, i) => {
    const category = i == 0 ? "similar" : i == 1 ? "popular" : "upcoming";
    state.recomendations[category] = rec.results.slice(0, 3).map((movie) => ({
      id: movie.id,
      poster: movie.poster_path,
      title: movie.title,
    }));
  });
}

export async function searchMovie(value, page = state.page) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=${page}`;

  const data = await fetchUrl(url);
  console.log(data);
  setMovies(data.results);
}

async function getVideo(id) {
  const res = await fetchUrl(`https://api.themoviedb.org/3/movie/${id}/videos`);
  state.movie = { ...state.movie, key: res.results[0].key };
  console.log(state.movie.key);
}
