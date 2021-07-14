export class Car {
  public id: string;
  public maker: string;
  public model: string;
  public year: number;
  public color: string;
  public subscriptionPrice: number;
  public availableFrom: Date;
  public fuelType: string;
  public mileage: number;
  public transmission: string;
  public seats: number;

  constructor(
    id: string,
    maker: string,
    model: string,
    year: number,
    color: string,
    subscriptionPrice: number,
    availableFrom: Date,
    fuelType: string,
    mileage: number,
    transmission: string,
    seats: number,
  ) {
    this.id = id;
    this.maker = maker;
    this.model = model;
    this.year = year;
    this.color = color;
    this.subscriptionPrice = subscriptionPrice;
    this.availableFrom = availableFrom;
    this.fuelType = fuelType;
    this.mileage = mileage;
    this.transmission = transmission;
    this.seats = seats;
  }
}
