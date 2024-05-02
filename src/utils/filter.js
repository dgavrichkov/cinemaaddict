import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (films) => films.slice(),
  [FilterType.WATCHED]: (films) => films.filter((film) => film.alreadyWatched),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.watchlist),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.favorite),
};
