import {Workout} from './workout.js';

export class Running extends Workout {
  type = 'running';
  renderType = 'Пробежка';

  constructor(coords, distance, duration, temp) {
    super(coords, distance, duration);
    this.temp = temp;
    this.calculatePace();
  }

  calculatePace() {
    this.pace = this.duration / this.distance;
  }
}
