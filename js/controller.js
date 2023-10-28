'use strict';
import getCity from './getCity.js';
import * as model from './model.js';
import mapView from './views/mapView.js';
import mapTaskView from './views/mapTaskView.js';
import taskListview from './views/taskListview.js';
import cityView from './views/cityView.js';
import weatherView from './views/weatherView.js';

// MAP
const controlMap = async function () {
  mapView.removeEl();

  // Get User current coords
  await model.getCurrentPosition();
  // Render map
  mapView.render(model.state.coords);

  // model.state.map.markDataArr.forEach(data => {
  //   taskListview.render(data);
  //   mapView.renderMark(data);
  // });
};

controlMap();

// control CITY MAP
const controlCityMap = async function () {
  try {
    const city = getCity.getCityName();
    if (!city) return;

    // mapView.renderSpeener();

    mapView.removeEl();

    // Load map
    await model.loadCityMap(city);

    mapView.render(model.state.coords);
  } catch (err) {
    throw err;
  }
};

//  control MAP MARK
const controlMapMark = function (task) {
  // Get map Event
  const event = mapView.mapEvent ?? '';

  model.getTaskMapEvenet(task, event);

  // Render map mark
  mapView.renderMark(model.state.map.markData);

  // Render Task list
  taskListview.render(model.state.map.markData);

  // set to SET To LOCALSTORAGE
  model.setTaskToLocalStorage();
};

// Control City data
const controlCityData = async function () {
  try {
    cityView._clear();

    // Get data form server
    cityView.renderSpeener();

    await model.getCityInfo();

    // Render City Data
    cityView.render(model.state.city.data);
  } catch (err) {
    cityView.renderError();
  }
};

//  control CITY WEATHER
const controlCityWeather = async function () {
  try {
    weatherView._clear();

    weatherView.renderSpeener();

    // Getting weather data from server
    await model.getcityWeather();

    // Get current date And Time
    weatherView.getDateTime(model.state.weather.weatherDateTime);

    // render weather to UI
    weatherView.render(model.state.weather.data);
  } catch (err) {
    weatherView.renderError();
  }
};

const init = function () {
  // subscriber
  getCity.addHandlerCity(controlCityMap);
  mapTaskView.getTaskHandlerClick(controlMapMark);
  cityView.runCityHandlerClick(controlCityData);
  weatherView.runCityWeatherHandlerClick(controlCityWeather);
};
init();
