import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const idx = this._films.findIndex((film) => film.id === update.id);

    if(idx === -1) {
      throw new Error('Film not exist, cannot update');
    }

    this._films = [
      ...this._films.slice(0, idx),
      update,
      ...this._films.slice(idx + 1),
    ];

    this._notify(updateType, update);
  }


  static adaptToClient(film) {
    const adaptedFilm = {
      id: film.id,
      name: film.film_info.title,
      originName: film.film_info.alternative_title,
      poster: film.film_info.poster,
      description: film.film_info.description,
      comments: film.comments,
      rating: film.film_info.total_rating,
      releaseDate: film.film_info.release.date,
      runtime: film.film_info.runtime,
      genres: film.film_info.genre,
      ageRating: film.film_info.age_rating,
      director: film.film_info.director,
      country: film.film_info.release.release_country,
      writers: film.film_info.writers,
      actors: film.film_info.actors,
      watchlist: film.user_details.watchlist,
      alreadyWatched: film.user_details.already_watched,
      watchingDate: film.user_details.watching_date,
      favorite: film.user_details.favorite,
    };

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = {
      id: film.id,
      film_info: {
        actors: film.actors,
        title: film.name,
        alternative_title: film.originName,
        poster: film.poster,
        description: film.description,
        director: film.director,
        genre: film.genres,
        runtime: film.runtime,
        total_rating: film.rating,
        release: {
          date: film.releaseDate,
          release_country: film.country,
        },
        age_rating: film.ageRating,
        writers: film.writers,
      },
      comments: film.comments,
      user_details: {
        favorite: film.favorite,
        watching_date: film.watchingDate,
        already_watched: film.alreadyWatched,
        watchlist: film.watchlist,
      },
    };
    return adaptedFilm;
  }
}
