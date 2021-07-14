export class CarModel {
  public name: string;
  public colors: string[];
  public transmission: string[];
  public fuelType: string[];

  constructor(name: string, colors: string[], transmission: string[], fuelType: string[]) {
    this.name = name;
    this.colors = colors;
    this.transmission = transmission;
    this.fuelType = fuelType;
  }
}
