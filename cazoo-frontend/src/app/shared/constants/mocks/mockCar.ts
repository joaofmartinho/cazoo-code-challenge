import { Car } from 'src/app/core/model/car';

export const MOCK_CAR_1: Car = {
  id: 'MOCKID',
  maker: 'BMW',
  model: 'X3',
  year: 2005,
  color: 'Black',
  subscriptionPrice: 2000,
  availableFrom: new Date(),
  fuelType: 'Diesel',
  mileage: 4500,
  transmission: 'Automatic',
  seats: 4
};

export const MOCK_CAR_2: Car = {
  id: 'QWERTY1234',
  maker: 'Toyota',
  model: 'Yaris',
  year: 1990,
  color: 'Black',
  subscriptionPrice: 2000,
  availableFrom: new Date(),
  fuelType: 'Gasoline',
  mileage: 200000,
  transmission: 'Manual',
  seats: 4
};
