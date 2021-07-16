import { PagableCarList } from 'src/app/core/model/pagableCarList';
import { MOCK_CAR_1, MOCK_CAR_2 } from './mockCar';

export const MOCK_PAGABLE_CAR_LIST: PagableCarList = {
  totalItems: 4,
  cars: [MOCK_CAR_1, MOCK_CAR_2, MOCK_CAR_1, MOCK_CAR_2],
  totalPages: 2,
  currentPage: 1
};
