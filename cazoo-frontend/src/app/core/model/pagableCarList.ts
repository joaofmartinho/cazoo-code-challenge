import { Car } from './car';

export class PagableCarList {
  public totalItems: number;
  public cars: Car[];
  public totalPages: number;
  public currentPage: number;

  constructor(totalItems: number, cars: Car[], totalPages: number, currentPage: number) {
    this.totalItems = totalItems;
    this.cars = cars;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
  }
}
