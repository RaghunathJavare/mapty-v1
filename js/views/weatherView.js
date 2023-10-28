import { ParentClass } from './view.js';

class cityWeather extends ParentClass {
  _dataContainer = document.querySelector('.data__container--3');
  _parentElement = document.querySelector('.weather-container');
  _dateTimeFormet = '';
  _massageError = 'could not found city weather please try again!'

  getDateTime(dateTime) {
    this._dateTimeFormet = dateTime;
  }

  runCityWeatherHandlerClick(handler) {
    this._dataContainer.addEventListener('click', function (e) {
      if (e.target.closest('.btn__country--weather')) handler();
    });
  }

  _generateMarkup() {
    this._clear();
    const { temp } = this._data.main;
    return `
    <div class="container-fluid">
        <h1 class="city-name text__sizer">${this._data.name}</h1>
        <h4 class="current-date text__sizer">${this._dateTimeFormet}</h4>
    </div>

<!-- current weather  -->

<div class="weather">
    <i class="fa-solid fa-cloud-sun current-whether"></i>
    <span class="current-weather">${temp.toFixed(1)}C°</span>
</div>
    `;
  }
}

export default new cityWeather();
