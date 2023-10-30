import { getJSON } from './helper.js';
import { WEATHER__APIKEY, GEOCODE__APIKEY } from './config.js';

export const state = {
  coords: [],
  mapCoords: [],
  map: {
    mapEventCoords: '',
    markData: '',
    markDataArr: [],
  },
  city: {
    data: [],
  },
  weather: {
    data: '',
    weatherDateTime: '',
  },
};

export const getCurrentPosition = async function () {
  const data = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  const { latitude: lat, longitude: lon } = data.coords;
  state.coords.push(lat, lon);
};

export const loadCityMap = async function (city) {
  try {
    if (!city) return;
    const res = await getJSON(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${WEATHER__APIKEY}`
    );
    if (res.length > 0) {
      const { lat, lon } = res[0];
      state.coords = [lat, lon];
    }
  } catch (err) {
    throw err;
  }
};

class GetDateTask {
  constructor(task, coords) {
    this.coords = coords;
    this.task = task;
    this._GetDateAndTime();
  }

  _GetDateAndTime() {
    const local = navigator.language;
    let options = {
      dateStyle: 'medium',
      timeStyle: 'short',
    };
    this.date = new Intl.DateTimeFormat(local, options).format(new Date());
  }
}

export const getTaskMapEvenet = function (task, mapEvnet) {
  const { lat, lng } = mapEvnet.latlng;

  // Getting mark Position
  state.map.mapEventCoords = [lat, lng];

  // Create a mark data OBJECT
  state.map.markData = new GetDateTask(task, [lat, lng]);

  // Mark Data Array
  state.map.markDataArr.push(state.map.markData);
};

export const getCityInfo = async function () {
  try {
    if (state.map.mapEventCoords) {
      const [lat, lng] = state.map.mapEventCoords;

      const data1 = await getJSON(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${GEOCODE__APIKEY}`
      );

      const [res] = data1.results;

      const data2 = await getJSON(`
    https://restcountries.com/v3.1/name/${res.country}`);
      state.city.data = data2;
    } else {
      alert('mark first work on your map');
    }
  } catch (err) {
    throw err;
  }
};

export const getcityWeather = async function () {
  try {
    const [lat, lng] = state.map.mapEventCoords;

    const data = await getJSON(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER__APIKEY}&units=metric`
    );
    state.weather.data = data;
  } catch (err) {
    throw err;
  }
};

// Currnet Date and Time formate
export const getWeatherDateTime = function () {
  const local = navigator.language;
  let options = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };
  state.weather.weatherDateTime = new Intl.DateTimeFormat(
    local,
    options
  ).format(new Date());
};

getWeatherDateTime();

export const setTaskToLocalStorage = function () {
  window.localStorage.setItem('tasks', JSON.stringify(state.map.markDataArr));
};

const getTaskToLocalStorage = function () {
  const data = JSON.parse(window.localStorage.getItem('tasks'));
  if (!data) return;
  state.map.markDataArr = data;

  state.map.markData = data;
};

getTaskToLocalStorage();

const clearLocalStorage = function () {
  localStorage.clear();
};
clearLocalStorage();
