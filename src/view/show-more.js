import AbstractView from './abstract.js';

const createShowMoreTemplate = () => {
  return '<button class="films-list__show-more">Show more</button>';
};

export default class ShowMoreView extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreTemplate();
  }

  _clickHandler(e) {
    e.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

}
