import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import {nanoid} from 'nanoid';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const trimDescription = (description) => {
  if(description.length <= 140) {
    return description;
  }

  const shortDescription = description.slice(0, 139).trim() + '...';
  return shortDescription;
};

export const defindRateColor = (rate) => {
  let sign = 'average';
  if(rate > 7) {
    sign = 'good';
  }
  if(rate < 4) {
    sign = 'poor';
  }
  return sign;
};

export const formatCommentDate = (date) => {
  return dayjs().from(date, true) + ' ago';
};

export const formatReleaseDate = (dateString) => {
  return dayjs(dateString).format('D MMM YYYY');
};

export const defindGenreSign = (list) => {
  return (list.length > 1) ? 'Genres' : 'Genre';
};

export const getUserFilms = (films) => {
  return films.filter((film) => film.alreadyWatched === true);
};

export const minutesToFormat = (min) => {
  return dayjs.duration(min, 'minutes').format('H[h] m[m]');
};

export const formatDateToYear = (date) => {
  return dayjs(date).year();
};

export const sortFilmsByRates = (filmA, filmB) => {
  return Math.floor(filmB.rating - filmA.rating);
};

export const sortFilmsByComments = (filmA, filmB) => {
  return Math.floor(filmB.comments.length - filmA.comments.length);
};

export const sortFilmsByDate = (filmA, filmB) => {
  return dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
};

export const getFilmContainer = (component) => {
  return component.getElement().querySelector('.films-list__container');
};

export const isPopupExist = () => {
  const popup = document.querySelector('.film-details');
  return popup !== null;
};

export const createComment = (emoji, text, author) => {
  return {
    id: nanoid(),
    date: dayjs(),
    emoji: emoji,
    text: text,
    author: author,
  };
};
