import {Workout} from './workout.js';

export class Cycling extends Workout {
  type = 'cycling';
  renderType = 'Велосипед';

  constructor(coords, distance, duration, climb) {
    super(coords, distance, duration);
    this.climb = climb;
    this.calculateSpeed();
  }

  calculateSpeed() {
    this.speed = this.distance / (this.duration / 60);
  }
}
