import { MOCK_CAR_1, MOCK_CAR_2 } from './mockCar';
import { PagableCarList } from './../../../core/model/pagableCarList';

export const MOCK_PAGABLE_CAR_LIST: PagableCarList = {
  totalItems: 4,
  cars: [MOCK_CAR_1, MOCK_CAR_2, MOCK_CAR_1, MOCK_CAR_2],
  totalPages: 2,
  currentPage: 1
};
