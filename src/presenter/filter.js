import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const';
import { render, RenderPosition, replace, remove } from '../utils/render.js';
import FilterView from '../view/menu.js';


export default class Filter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComp = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComp = this._filterComp;

    this._filterComp = new FilterView(filters, this._filterModel.getFilter());
    this._filterComp.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if(prevFilterComp === null) {
      render(this._filterContainer, this._filterComp, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComp, prevFilterComp);
    remove(prevFilterComp);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();
    const filters = {
      all: filter[FilterType.ALL](films).length,
      watchlist: filter[FilterType.WATCHLIST](films).length,
      favorite: filter[FilterType.FAVORITES](films).length,
      history: filter[FilterType.WATCHED](films).length,
    };

    return filters;
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if(this._filterModel.getFilter() === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);

  }

  setStatMenuActive() {
    this._filterComp.setStatActive();
  }

  setStatMenuUnactive() {
    this._filterComp.setStatUnactive();
  }

  getFilterElement() {
    return this._filterComp.getElement();
  }
}
