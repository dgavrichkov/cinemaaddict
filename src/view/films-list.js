import AbstractView from './abstract.js';

const createFilmsListTemplate = (isExtra, dataId) => {
  let title = '';
  switch(dataId) {
    case 'top-rated':
      title = '<h2 class="films-list__title">Top rated</h2>';
      break;
    case 'most-commented':
      title = '<h2 class="films-list__title">Most commented</h2>';
      break;
    case 'empty':
      title = '<h2 class="films-list__title">There are no movies in our database</h2>';
      break;
    case 'loading':
      title = '<h2 class="films-list__title">Loading...</h2>';
      break;
    default:
      title = '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';
  }
  return `<section
      class="films-list ${isExtra ? 'films-list--extra' : ''}"
      data-list-id='${dataId}'
    >
      ${title}
      ${dataId === 'empty' ? '' : '<div class="films-list__container"></div>'}
    </section>
  `;
};

export default class FilmsList extends AbstractView {
  constructor(isExtra, dataId) {
    super();
    this._isExtra = isExtra;
    this._dataId = dataId;
  }

  getTemplate() {
    return createFilmsListTemplate(this._isExtra, this._dataId);
  }

}
