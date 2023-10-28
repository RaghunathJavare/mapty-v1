import { ParentClass } from './view.js';

class TaskList extends ParentClass {
  _dataContainer = document.querySelector('.data__container--2');
  _parentElement = document.querySelector('.country--container');
  _massageError = 'could not found city please try again!'

  
  runCityHandlerClick(handler) {
    this._dataContainer.addEventListener('click', function (e) {
      if (e.target.closest('.btn-country')) handler();
    });
  }

  _generateMarkup() {
    this._clear();
    const [data] = this._data;

    const { svg } = data.flags;

    const [currencieObj] = Object.values(data.currencies);

    const { name } = currencieObj;

    // Get language
    const languageObj = Object.values(data.languages);

    const [countryLang] = languageObj;

    return `
    <div class="country--container">
      <article class="country">
        <img class="country__img" src="${svg}" />
        <div class="country__data">
          <h3 class="country__name">${data.cca3}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row">
            <span>👫</span>${(+data.population / 100000000).toFixed(2)}
          </p>
          <p class="country__row">
            <span>🗣️</span>${countryLang}
          </p>
          <p class="country__row">
            <span>💰</span>${name}
          </p>
        </div>
      </article>
    </div>

         `;
  }
}

export default new TaskList();
