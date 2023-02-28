// 'use strict';
import {App} from './components/app.js';

// const form = document.querySelector('.form');
// const containerWorkouts = document.querySelector('.workouts');
// const inputType = document.querySelector('.form__input--type');
// const inputDistance = document.querySelector('.form__input--distance');
// const inputDuration = document.querySelector('.form__input--duration');
// const inputTemp = document.querySelector('.form__input--temp');
// const inputClimb = document.querySelector('.form__input--climb');
// const formBtn = document.querySelector('.form__btn');

// class Workout {
//   date = new Date();
//   id = (new Date().getTime() + '').slice(-5);

//   constructor(coords, distance, duration) {
//     this.coords = coords;
//     this.distance = distance;
//     this.duration = duration;
//   }
// }

// class Running extends Workout {
//   type = 'running';
//   renderType = 'Пробежка';

//   constructor(coords, distance, duration, temp) {
//     super(coords, distance, duration);
//     this.temp = temp;
//     this.calculatePace();
//   }

//   calculatePace() {
//     this.pace = this.duration / this.distance;
//   }
// }

// class Cycling extends Workout {
//   type = 'cycling';
//   renderType = 'Велосипед';

//   constructor(coords, distance, duration, climb) {
//     super(coords, distance, duration);
//     this.climb = climb;
//     this.calculateSpeed();
//   }

//   calculateSpeed() {
//     this.speed = this.distance / (this.duration / 60);
//   }
// }

// class App {
//   #map;
//   #mapEvent;
//   #workouts = [];

//   constructor() {
//     this._getPosition();
//     form.addEventListener('submit', this._newWorkout.bind(this));
//     inputType.addEventListener('change', this._toggleClimbField);
//   }

//   _getPosition() {
//     navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
//       alert('Невозможно получить ваше местоположение');
//     });
//   }

//   _loadMap(position) {
//     const {latitude, longitude} = position.coords;
//     this.#map = L.map('map').setView([latitude, longitude], 13);

//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(this.#map);

//     this.#map.on('click', this._showForm.bind(this));
//   }

//   _showForm(evt) {
//     form.classList.remove('hidden');
//     inputDistance.focus();
//     this.#mapEvent = evt;
//   }

//   _hideForm() {
//     inputDistance.value =
//       inputDuration.value =
//       inputTemp.value =
//       inputClimb.value =
//         '';
//     form.classList.add('hidden');
//   }

//   _toggleClimbField() {
//     inputTemp.parentElement.classList.toggle('form__row--hidden');
//     inputClimb.parentElement.classList.toggle('form__row--hidden');
//   }

//   _newWorkout(evt) {
//     evt.preventDefault();
//     let workout;
//     const {lat, lng} = this.#mapEvent.latlng;

//     const typeTraining = inputType.value;
//     const distanceTraining = inputDistance.value;
//     const durationTraining = inputDuration.value;

//     if (typeTraining === 'running') {
//       const tempTraining = inputTemp.value;
//       workout = new Running(
//         [lat, lng],
//         distanceTraining,
//         durationTraining,
//         tempTraining
//       );
//     }

//     if (typeTraining === 'cycling') {
//       const climbTraining = inputClimb.value;
//       workout = new Cycling(
//         [lat, lng],
//         distanceTraining,
//         durationTraining,
//         climbTraining
//       );
//     }

//     this.#workouts.push(workout);

//     this._displayWorkout(workout);

//     this._hideForm();
//   }

//   _displayWorkout(workout) {
//     const humanDate = this._getDate(workout.date);

//     L.marker(workout.coords)
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           content: `${workout.type === 'running' ? '🏃' : '🚵‍♂️'}${
//             workout.renderType
//           } ${humanDate}`,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${workout.type}-popup`,
//         })
//       )
//       .openPopup();
//     this._renderWorkoutList(workout);
//   }

//   _getDate(date) {
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${day <= 9 ? '0' + day : day}.${
//       month <= 9 ? '0' + month : month
//     }.${year}`;
//   }

//   _renderWorkoutList(workout) {
//     const {
//       id,
//       date,
//       distance,
//       duration,
//       temp,
//       climb,
//       pace,
//       speed,
//       renderType,
//       type,
//     } = workout;

//     const humanDate = this._getDate(date);

//     containerWorkouts.insertAdjacentHTML(
//       'beforeend',
//       `<li class="workout workout--${type}" data-id="${id}">
//         <h2 class="workout__title">${renderType} ${humanDate}</h2>
//         <div class="workout__details">
//           <span class="workout__icon">${
//             workout.type === 'running' ? '🏃' : '🚵‍♂️'
//           }</span>
//           <span class="workout__value">${distance}</span>
//           <span class="workout__unit">км</span>
//         </div>
//         <div class="workout__details">
//           <span class="workout__icon">⏱</span>
//           <span class="workout__value">${duration}</span>
//           <span class="workout__unit">мин</span>
//         </div>
//         <div class="workout__details">
//           <span class="workout__icon">📏⏱</span>
//           <span class="workout__value">${
//             Math.ceil(temp) || Math.ceil(speed)
//           }</span>
//           <span class="workout__unit">${temp ? 'м/мин' : 'км/ч'}</span>
//         </div>
//         <div class="workout__details">
//           <span class="workout__icon">${pace ? '👟⏱' : '🏔'}</span>
//           <span class="workout__value">${
//             Math.ceil(pace) || Math.ceil(climb)
//           }</span>
//           <span class="workout__unit">${pace ? 'шаг/мин' : 'м'}</span>
//         </div>
//       </li>`
//     );
//   }
// }

const app = new App();
console.log(app);

// const isPalidrom = (str) =>
//   str.toLowerCase().trim().replace(/\s/g, '') ===
//   str.toLowerCase().trim().replace(/\s/g, '').split('').reverse().join('');
