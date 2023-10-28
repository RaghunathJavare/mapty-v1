class GetCity {
  _parentEl = document.querySelector('.search');

  getCityName() {
    const city = this._parentEl.querySelector('.input__city--form').value;
    this._clear();
    return city;
  }

  _clear() {
    return (this._parentEl.querySelector('.input__city--form').value = '');
  }

  addHandlerCity(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      // Publisher
      handler();
    });
  }
}
export default new GetCity();
