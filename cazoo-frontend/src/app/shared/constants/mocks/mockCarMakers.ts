import { CarMaker } from 'src/app/core/model/carMaker';
import { CarModel } from 'src/app/core/model/carModel';

export const MOCK_CAR_MAKER_LIST: CarMaker[] = [
  new CarMaker('BMW', [
    new CarModel('Series 3', ['White', 'Yellow', 'Black'], ['Manual'], ['Eletric', 'Gasoline']),
    new CarModel('X1', ['White', 'Yellow', 'Black'], ['Automatic'], ['Gasoline']),
  ]),
  new CarMaker('Toyota', [
    new CarModel('Yaris', ['White', 'Yellow', 'Black'], ['Manual', 'Automatic'], ['Gasoline']),
    new CarModel('RAV4', ['White', 'Yellow', 'Black'], ['Manual'], ['Gasoline']),
  ]),
  new CarMaker('Renault', [
    new CarModel('Clio', ['White', 'Yellow', 'Black'], ['Manual'], ['Gasoline', 'Diesel']),
    new CarModel('Megane', ['White', 'Yellow', 'Black'], ['Manual', 'Automatic'], ['Gasoline']),
  ]),
];
