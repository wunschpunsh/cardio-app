import {Running} from './workouts/running.js';
import {Cycling} from './workouts/cycling.js';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputTemp = document.querySelector('.form__input--temp');
const inputClimb = document.querySelector('.form__input--climb');

export class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    this._getLocalStorageData();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleClimbField);
    containerWorkouts.addEventListener('click', this._moveToMark.bind(this));
  }

  _moveToMark(evt) {
    const targetWorkout = evt.target.closest('.workout');
    if (!targetWorkout) return;
    const targetWorkoutObj = this.#workouts.find(
      (item) => item.id === targetWorkout.dataset.id
    );
    this.#map.setView(targetWorkoutObj.coords);
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
      alert('Невозможно получить ваше местоположение');
    });
  }

  _loadMap(position) {
    const {latitude, longitude} = position.coords;
    this.#map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach((workout) => this._displayWorkoutMark(workout));
  }

  _showForm(evt) {
    form.classList.remove('hidden');
    inputDistance.focus();
    this.#mapEvent = evt;
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputTemp.value =
      inputClimb.value =
        '';
    form.classList.add('hidden');
  }

  _toggleClimbField() {
    inputTemp.parentElement.classList.toggle('form__row--hidden');
    inputClimb.parentElement.classList.toggle('form__row--hidden');
  }

  _newWorkout(evt) {
    evt.preventDefault();
    let workout;
    const {lat, lng} = this.#mapEvent.latlng;

    const typeTraining = inputType.value;
    const distanceTraining = inputDistance.value;
    const durationTraining = inputDuration.value;

    if (typeTraining === 'running') {
      const tempTraining = inputTemp.value;
      workout = new Running(
        [lat, lng],
        distanceTraining,
        durationTraining,
        tempTraining
      );
    }

    if (typeTraining === 'cycling') {
      const climbTraining = inputClimb.value;
      workout = new Cycling(
        [lat, lng],
        distanceTraining,
        durationTraining,
        climbTraining
      );
    }

    this.#workouts.push(workout);

    this._displayWorkoutMark(workout);

    this._renderWorkoutList(workout);

    this._hideForm();

    this._addWorkoutsTolocalStorage();
  }

  _displayWorkoutMark(workout) {
    const {coords, renderType, type} = workout;

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          content: `${
            type === 'running' ? '🏃' : '🚵‍♂️'
          }${renderType} ${new Intl.DateTimeFormat('ru-Ru').format(this.date)}`,
          autoClose: false,
          closeOnClick: false,
          className: `${type}-popup`,
        })
      )
      .openPopup();
  }

  _renderWorkoutList(workout) {
    const {
      id,

      distance,
      duration,
      temp,
      climb,
      pace,
      speed,
      renderType,
      type,
    } = workout;

    containerWorkouts.insertAdjacentHTML(
      'beforeend',
      `<li class="workout workout--${type}" data-id="${id}">
        <h2 class="workout__title">${renderType} ${new Intl.DateTimeFormat(
        'ru-Ru'
      ).format(this.date)}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃' : '🚵‍♂️'
          }</span>
          <span class="workout__value">${distance}</span>
          <span class="workout__unit">км</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${duration}</span>
          <span class="workout__unit">мин</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">📏⏱</span>
          <span class="workout__value">${
            Math.ceil(temp) || Math.ceil(speed)
          }</span>
          <span class="workout__unit">${temp ? 'м/мин' : 'км/ч'}</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${pace ? '👟⏱' : '🏔'}</span>
          <span class="workout__value">${
            Math.ceil(pace) || Math.ceil(climb)
          }</span>
          <span class="workout__unit">${pace ? 'шаг/мин' : 'м'}</span>
        </div>
      </li>`
    );
  }

  _addWorkoutsTolocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorageData() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    console.log(data);
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach((workout) => this._renderWorkoutList(workout));
  }
}
