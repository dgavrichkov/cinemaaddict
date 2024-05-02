import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import {StatisticPeriod} from '../const.js';

dayjs.extend(dayOfYear);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

export const getUserRank = (films) => {
  if(films.length > 20) {
    return 'Movie Buff';
  }
  if(films.length > 10) {
    return 'Fan';
  }
  if(films.length > 1) {
    return 'Novice';
  }
  return '';
};

export const getTotalDuration = (films) => {
  let minutes = 0;
  films.forEach((film) => {
    minutes = minutes + +film.runtime;
  });
  return minutes;
};

export const getTopGenre = (films) => {
  const countGenres = getCountGenres(films);
  const maxVal = Math.max(...Object.values(countGenres));
  const topGenre = Object.entries(countGenres).find((entry) => entry[1] === maxVal)[0];
  return topGenre;
};

export const getUserstat = (films) => {
  return {
    totalDuration: films.length ? getTotalDuration(films) : 0,
    topGenre: films.length ? getTopGenre(films) : '',
    historyCount: films.length,
  };
};

export const periodDateValues = {
  [StatisticPeriod.TODAY]: 1,
  [StatisticPeriod.WEEK]: 6,
  [StatisticPeriod.MONTH]: 30,
  [StatisticPeriod.YEAR]: 365,

};

export const getFilmsOnPeriod = (films, period) => {

  const currentDate = dayjs().toDate();
  let periodDate = null;
  switch(period) {
    case StatisticPeriod.ALL:
      break;
    case StatisticPeriod.TODAY:
      periodDate = dayjs().subtract(1, 'day').toDate();
      break;
    case StatisticPeriod.WEEK:
      periodDate = dayjs().subtract(1, 'week').toDate();
      break;
    case StatisticPeriod.MONTH:
      periodDate = dayjs().subtract(1, 'month').toDate();
      break;
    case StatisticPeriod.YEAR:
      periodDate = dayjs().subtract(1, 'year').toDate();
      break;
  }
  if(!periodDate) {
    return films;
  }
  const chosen = films.filter((film) => {
    return dayjs(dayjs(film.watchingDate).toDate()).isSame(periodDate) ||
      dayjs(dayjs(film.watchingDate).toDate()).isBetween(periodDate, currentDate) ||
      dayjs(dayjs(film.watchingDate).toDate()).isSame(currentDate);
  });
  return chosen;

};

export const getViewedFilms = (films) => {
  return films.filter((film) => film.alreadyWatched);
};

export const getCountGenres = (films) => {
  const concatGenres = [];
  const countGenres = {};

  films.forEach((film) => {
    concatGenres.push(...film.genres);
  });

  const uniqGenres = new Set(concatGenres);

  uniqGenres.forEach((genre) => {
    countGenres[genre] = concatGenres.filter((item) => item === genre).length;
  });
  return countGenres;
};
