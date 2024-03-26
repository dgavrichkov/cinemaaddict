import SmartView from './smart.js';
import {
  defindRateColor,
  formatCommentDate,
  formatReleaseDate,
  defindGenreSign,
  minutesToFormat,
  createComment
} from '../utils/film.js';
import {keyCombo} from '../utils/common.js';
import he from 'he';

const createGenreItem = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createCommentItem = (commentObj) => {
  const {id, emotion, comment, author, date} = commentObj;
  return `<li class="film-details__comment" data-cmt-id="${id}">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatCommentDate(date)}</span>
          <button
            class="film-details__comment-delete"
          >Delete</button>
        </p>
      </div>
    </li>
  `;
};

const createErrorMessage = (message) => {
  return `<div><b>${message}</b></div>`;
};

const createNewCommentEmojiImg = (emoji) => {
  return `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`;
};

export const createFilmDetailsTemplate = (film) => {
  const {
    name,
    originName,
    poster,
    ageRating,
    description,
    rating,
    releaseDate,
    country,
    genres,
    director,
    writers,
    actors,
    runtime,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
    stateNewCmtEmoji,
    stateNewCmtText,
    stateFilmComments,
    isLoading,
  } = film;

  const genreItemsList = genres.map((genre) => {
    return createGenreItem(genre);
  }).join('');

  let commentsList = [];

  if(stateFilmComments) {
    commentsList = stateFilmComments.map((comment) => {
      return createCommentItem(comment);
    }).join('');
  } else if(isLoading) {
    commentsList = createErrorMessage('Loading..');
  } else {
    commentsList = createErrorMessage('No comments for this movie');
  }

  const newCommentImg = createNewCommentEmojiImg(stateNewCmtEmoji);

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${name}">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">${originName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating" style="color: var(--text-color-${defindRateColor(rating)})">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatReleaseDate(releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${minutesToFormat(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${defindGenreSign(genres)}</td>
                  <td class="film-details__cell">
                    ${genreItemsList}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? 'checked' : ''}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist js-watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? 'checked' : ''}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched js-watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? 'checked' : ''}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite js-favorite">Add to favorites</label>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsList}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
                ${stateNewCmtEmoji ? newCommentImg : ''}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" value="${stateNewCmtText ? stateNewCmtText : ''}">${stateNewCmtText ? he.encode(stateNewCmtText) : ''}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
  `;
};

export default class FilmDetails extends SmartView {
  constructor(film, comments) {
    super();
    this._state = FilmDetails.parseDataToState(film, comments);
    this._clickCloseHandler = this._clickCloseHandler.bind(this);
    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);
    this._clickWatchlistHandler = this._clickWatchlistHandler.bind(this);
    this._clickWatchedHandler = this._clickWatchedHandler.bind(this);
    this._clickEmojiHandler = this._clickEmojiHandler.bind(this);
    this._newCommentTextHandler = this._newCommentTextHandler.bind(this);
    this._specialFormSubmitHandler = this._specialFormSubmitHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._setInnerHandlers();
    this._isLoading = true;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._state);
  }

  _formSubmitHandler(e) {
    e.preventDefault();
    this._callback.formSubmit(FilmDetails.parseStateToData(this._state));
  }

  _clickEmojiHandler(e) {
    e.preventDefault();
    this.updateData({
      stateNewCmtEmoji: e.target.value,
      scrollPos: this.getElement().scrollTop,
    });
  }

  _clickCloseHandler(e) {
    e.preventDefault();
    this._callback.closeClick();
    this.getElement().querySelector('.film-details__close').removeEventListener('click', this._clickCloseHandler);
  }

  _clickFavoriteHandler() {
    this._callback.favoriteClick();
  }

  _clickWatchlistHandler() {
    this._callback.watchlistClick();
  }

  _clickWatchedHandler() {
    this._callback.watchedClick();
  }

  // это только те обработчики, до которых нет дела презентеру. Их дело - просто обновить состояние.
  _setInnerHandlers() {
    const emojies = this.getElement().querySelectorAll('.film-details__emoji-item');
    emojies.forEach((emoji) => {
      emoji.addEventListener('click', this._clickEmojiHandler);
    });

    this._setCmtDelHandler();

    this.getElement()
      .querySelector('.film-details__comment-input').addEventListener('input', this._newCommentTextHandler);

    keyCombo(this._specialFormSubmitHandler, 'Control', 'Enter');
  }

  _setCmtDelHandler() {
    const delbtns = this.getElement().querySelectorAll('.film-details__comment-delete');
    delbtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cmtId = btn.closest('.film-details__comment').dataset.cmtId;
        const newComments = this._state.comments.filter((cmt) => {
          return cmt.id !== cmtId;
        });

        this.updateData({comments: newComments}, true);
      });
    });
  }

  _specialFormSubmitHandler() {
    if(this._state.stateNewCmtEmoji === null || this._state.stateNewCmtText === null) {
      return;
    }

    const newComment = createComment(this._state.stateNewCmtEmoji, this._state.stateNewCmtText);

    const newComments = this._state.comments.slice();
    newComments.push(newComment);

    this.updateData({comments: newComments}, true);

    this._callback.formSubmit(FilmDetails.parseStateToData(this._state));
  }

  _newCommentTextHandler(e) {
    e.preventDefault();
    this.updateData({
      stateNewCmtText: e.target.value,
    }, true);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setClickCloseHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.film-details__close').addEventListener('click', this._clickCloseHandler);
  }

  setClickFavoriteHandler(callback) {
    this._callback.favoriteClick = callback;
    const favTrg = this.getElement().querySelector('.js-favorite');
    favTrg.addEventListener('click', this._clickFavoriteHandler);
  }

  setClickWatchlistHandler(callback) {
    this._callback.watchlistClick = callback;
    const watchlistTrg = this.getElement().querySelector('.js-watchlist');
    watchlistTrg.addEventListener('click', this._clickWatchlistHandler);
  }

  setClickWatchedHandler(callback) {
    this._callback.watchedClick = callback;
    const watchedTrg = this.getElement().querySelector('.js-watched');
    watchedTrg.addEventListener('click', this._clickWatchedHandler);
  }

  setFilmComments(comments) {
    this._isLoading = false;
    this.updateData({
      stateFilmComments: comments,
      isLoading: this._isLoading,
    });
  }

  // устанавливает позицию скролла. Метод публичен, так как его вызывает презентер при перерисовке попапа
  setScrollPos() {
    if(this._state.scrollPos !== 0) {
      this.getElement().scrollTop = this._state.scrollPos;
    }
  }
  // повторная установка обработчиков клика и позиции скролла. В общем, то, что нужно восстановить, когда перерисовывается попап
  restoreElement() {
    this._setInnerHandlers();
    this.setClickCloseHandler(this._callback.closeClick);
    this.setClickWatchedHandler(this._callback.watchedClick);
    this.setClickFavoriteHandler(this._callback.favoriteClick);
    this.setClickWatchlistHandler(this._callback.watchlistClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setScrollPos();
  }

  static parseDataToState(film, comments) {
    return Object.assign(
      {},
      film,
      {
        isFavorite: film.favorite,
        isWatched: film.alreadyWatched,
        isWatchlist: film.watchlist,
        stateNewCmtText: null,
        stateNewCmtEmoji: null,
        stateFilmComments: comments,
        isLoading: true,
      },
    );
  }

  static parseStateToData(state) {
    state = Object.assign({}, state);

    delete state.isFavorite;
    delete state.isWatched;
    delete state.isWatchlist;
    delete state.stateNewCmtText;
    delete state.stateNewCmtEmoji;
    delete state.stateFilmComments;
    delete state.isLoading;

    return state;
  }
}
