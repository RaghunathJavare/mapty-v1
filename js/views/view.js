export class ParentClass {
  _parentElement = '';
  _data;

  render(data) {
    if (!data) return;
    this._data = data;
    const createMarkup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', createMarkup);
  }

  renderSpeener() {
    const markup = `
    <div class="d-flex justify-content-center">
        <div class="spinner-border spinner" role="status">
          <span class="sr-only">Loading...</span>
        </div>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  renderError(massage = this._massageError) {
    const markup = ` 
    <div class='error-massage'>
        <h3>${massage}</h3>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

 
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
