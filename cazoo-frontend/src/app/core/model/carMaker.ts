import { CarModel } from './carModel';

export class CarMaker {
  public name: string;
  public models: CarModel[];

  constructor(name: string, models: CarModel[]) {
    this.name = name;
    this.models = models;
  }
}
