import AbstractView from './abstract.js';
import {getUserRank} from '../utils/statistic.js';

const createProfileTemplate = (userStat) => {
  return `<section class="header__profile profile">
      <p class="profile__rating">${userStat}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};

export default class Profile extends AbstractView {
  constructor(films) {
    super();
    this._statData = getUserRank(films);
  }

  getTemplate() {
    return createProfileTemplate(this._statData);
  }

}
