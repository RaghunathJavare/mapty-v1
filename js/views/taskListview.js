import { ParentClass } from './view.js';

class TaskList extends ParentClass {
  _parentElement = document.querySelector('.data__container--1');

  _generateMarkup() {
    return `
            <div class=" alert container-fluid tasks mt-4">
                <div class="work-container">
                    <p style="text-align:left;">${this._data.date}</p>
                    <h4>${this._data.task}</h4>
                </div>
            </div>`;
  }
}

export default new TaskList();
