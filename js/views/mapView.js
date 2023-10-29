// import GetDateTask, { mapEvnet } from '../model.js';
import { ParentClass } from './view.js';
import { MAPZOOM } from '../config.js';
import mapTaskView from './mapTaskView.js';

class RenderMap extends ParentClass {
  _map;
  _parentElement = document.querySelector('.map-container');
  mapEvent;
  _massageError = 'Could not found your map please try again!';

  render(data) {
    this._data = data;
    this._renderMap();
  }

  removeEl() {
    this._clear();
    const newMap = document.createElement('div');
    newMap.id = 'map';
    this._parentElement.append(newMap);
  }

  _renderMap() {
    this._map = L.map('map').setView(this._data, MAPZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>contributors',
    }).addTo(this._map);

    this._map.on('click', this.getMapEvent.bind(this));
  }

  getMapEvent(mapEvent) {
    mapTaskView.showForm();
    return (this.mapEvent = mapEvent);
  }
  renderMark(data) {
    // If data is not exit
    if (!data) return;
    L.marker(data.coords)
      .addTo(this._map)
      .bindPopup(
        L.popup({
          maxwidth: 100,
          minwidth: 70,
          autoClose: false,
          closeOnClick: false,
          className: `task-popup`,
        })
      )
      .setPopupContent(`${data.task}`)
      .openPopup();
  }
}
export default new RenderMap();
