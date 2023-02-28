export class Workout {
  date = new Date();
  id = (new Date().getTime() + '').slice(-5);

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}
