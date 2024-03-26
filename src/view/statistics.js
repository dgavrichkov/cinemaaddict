import AbstractView from './abstract.js';

const createStatisticsTemplate = (films) => {
  return `<p>${films.length} movies inside</p>`;
};

export default class SiteStat extends AbstractView {
  constructor(statData) {
    super();
    this._statData = statData;
  }

  getTemplate() {
    return createStatisticsTemplate(this._statData);
  }

}
