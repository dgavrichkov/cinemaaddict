import AbstractView from './abstract.js';
import {FilterType} from '../const';

const createMenuTemplate = (filter, currentFilterType) => {
  const {watchlist, favorite, history} = filter;
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a
          href="#all"
          data-filter-type="all"
          class="main-navigation__item ${currentFilterType === FilterType.ALL ? 'main-navigation__item--active' : ''}"
        >All movies</a>
        <a
          href="#watchlist"
          data-filter-type="watchlist"
          class="main-navigation__item ${currentFilterType === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}"
        >
          Watchlist <span class="main-navigation__item-count">${watchlist}</span>
        </a>
        <a
          href="#history"
          data-filter-type="history"
          class="main-navigation__item ${currentFilterType === FilterType.WATCHED ? 'main-navigation__item--active' : ''}"
        >
          History <span class="main-navigation__item-count">${history}</span>
        </a>
        <a
          href="#favorites"
          data-filter-type="favorites"
          class="main-navigation__item ${currentFilterType === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}"
        >
          Favorites <span class="main-navigation__item-count">${favorite}</span>
        </a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>
  `;
};

export default class Menu extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;
    this._currentFilterElement = this.getElement().querySelector('.main-navigation__item--active');
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statClickHandler = this._statClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filters, this._currentFilterType);
  }

  _filterTypeChangeHandler(e) {
    if (e.target.tagName !== 'A') {
      return;
    }
    e.preventDefault();
    const btn = e.target;
    this._callback.changeFilterType(btn.dataset.filterType);
  }

  _statClickHandler(e) {
    this._callback.statClick(e);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.changeFilterType = callback;
    this.getElement().querySelector('.main-navigation__items').addEventListener('click', this._filterTypeChangeHandler);
  }

  setStatActive() {
    this._currentFilterElement.classList.remove('main-navigation__item--active');
    this.getElement().querySelector('.main-navigation__additional').classList.add('main-navigation__additional--active');
  }
  setStatUnactive() {
    this._currentFilterElement.classList.add('main-navigation__item--active');
    this.getElement().querySelector('.main-navigation__additional').classList.remove('main-navigation__additional--active');
  }

  setStatClick(callback) {
    this._callback.statClick = callback;
    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._statClickHandler);
  }
}
