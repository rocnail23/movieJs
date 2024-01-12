import movieView from "./views/Movie";
import moviesView from "./views/Movies";
import * as model from "./model";
import sideView from "./views/Side";
import searchView from "./views/Search";
import categoryView from "./views/Category";
import videoView from "./views/Video";

const controllerMovies = async (param = false) => {
  try {
    await model.getMovies(param);
    moviesView.generateMarkup(model.state.movies);
    moviesView.render("afterBegin");
  } catch (error) {
    console.log(error);
  }
};

const controllerMovie = () => {
  movieView.generateMarkUp(model.state.movie);
  movieView.render("afterBegin");
};

const controllerSide = async (update = false) => {
  await model.getRecomendations();
  sideView.generateMarkup(model.state.recomendations);

  if (!update) {
    sideView.clear();
    sideView.render("afterBegin");
  } else {
    sideView.update();
  }
};

const controllerClickMovie = async (id) => {
  await model.getMovie(id);
  controllerSide(true);
  videoView.clearListener();
  movieView.generateMarkUp(model.state.movie);
  movieView.clear();
  movieView.render("afterBegin");
  console.log(model.state.movie.key);
  controllerKeyYoutube(model.state.movie.key);
  videoView.openHandlerButtonVideo();
};

const attachHandlerClickMovieToView = (...view) => {
  view.forEach((view) => {
    view.handleMovie(controllerClickMovie);
  });
};

const controllerSearch = async (value) => {
  if (model.state.timeOut) {
    clearTimeout(model.state.timeOut);
  }

  model.setTime(
    setTimeout(async () => {
      await model.searchMovie(value);
      moviesView.generateMarkup(model.state.movies);
      moviesView.update(true);
    }, 400)
  );
};

const controllerCategory = async (value) => {
  try {
    moviesView.clear();
    await controllerMovies(value);
    movieView.clear();
    controllerMovie();
    controllerSide(true);
  } catch (error) {
    console.log(error);
  }
};

function controllerKeyYoutube(key) {
  videoView.setYoutubeVideoUrl(key);
}

const init = async () => {
  await controllerMovies();
  controllerMovie();
  controllerKeyYoutube(model.state.movie.key);
  videoView.openHandlerButtonVideo();
  videoView.closeHandlerButtonVideo();
  controllerSide();
  attachHandlerClickMovieToView(moviesView, sideView);
  searchView.handlerSearch(controllerSearch);
  categoryView.handlerCategory(controllerCategory);
};

init();
