import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {getUserstat, getCountGenres, getFilmsOnPeriod, getUserRank} from '../utils/statistic.js';
import {StatisticPeriod} from '../const.js';

const createDurationTemplate = (minutes) => {
  return `${Math.floor(minutes/60)}<span class="statistic__item-description">h</span> ${minutes%60}<span class="statistic__item-description">m</span>
  `;
};

const renderGenreStatistics = (genreCtx, state) => {
  const {films, currentPeriod} = state;
  const filmsOnPeriod = getFilmsOnPeriod(films, currentPeriod);
  if(filmsOnPeriod === 0) {
    return;
  }
  const countGenres = getCountGenres(filmsOnPeriod);
  const BAR_HEIGHT = 50;
  const sortedGenresCount = Object.fromEntries(Object.entries(countGenres).sort((a, b) => {
    return b[1] - a[1];
  }));
  const statGenres = Object.keys(sortedGenresCount);
  const statValues = Object.values(sortedGenresCount);
  genreCtx.height = BAR_HEIGHT * statGenres.length;
  return new Chart(genreCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: statGenres,
      datasets: [{
        data: statValues,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        barThickness: 24,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createUserStatTemplate = (state) => {
  const {currentPeriod, films} = state;
  const filmsOnPeriod = getFilmsOnPeriod(films, currentPeriod);
  const statData = getUserstat(filmsOnPeriod);
  const {historyCount, totalDuration, topGenre} = statData;
  const userRank = getUserRank(films);
  // TO-DO - вынести рендеринг периодов в отдельную функцию
  return `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${currentPeriod === 'all-time' ? 'checked' : ''}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${currentPeriod === 'today' ? 'checked' : ''}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${currentPeriod === 'week' ? 'checked' : ''}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${currentPeriod === 'month' ? 'checked' : ''}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${currentPeriod === 'year' ? 'checked' : ''}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${historyCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${createDurationTemplate(totalDuration)}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>
  `;
};

export default class UserStat extends SmartView {
  constructor(films) {
    super();
    this._state = {
      films,
      currentPeriod: StatisticPeriod.ALL,
    };
    this._genreChart = null;
    this._periodChangeHandler = this._periodChangeHandler.bind(this);
    this._setPeriodChangeHandlers();
    this._setChart();
  }

  getTemplate() {
    return createUserStatTemplate(this._state);
  }

  _periodChangeHandler(e) {
    e.preventDefault();
    if(e.target.classList.contains('statistic__filters-label')) {
      this.updateData({
        currentPeriod: e.target.previousElementSibling.value,
      });
      return;
    }
  }

  _setChart() {
    if(this._genreChart !== null) {
      this._genreChart = null;
    }
    const genreCtx = this.getElement().querySelector('.statistic__chart');
    renderGenreStatistics(genreCtx, this._state);
  }

  _setPeriodChangeHandlers() {
    this.getElement().addEventListener('click', this._periodChangeHandler);
  }

  restoreElement() {
    this._setPeriodChangeHandlers();
    this._setChart();
  }
}
