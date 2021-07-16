import { MOCK_CAR_1 } from './../../../shared/constants/mocks/mockCar';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from 'src/app/core/services/car.service';
import { PagableCarList } from '../../model/pagableCarList';
import { MOCK_PAGABLE_CAR_LIST } from '../../../shared/constants/mocks/mockPagableCarList';
import { Car } from '../../model/car';

@Injectable()
export class MockCarService extends CarService {
  getCars = (pageNumber = 0, pageSize = 10): Observable<PagableCarList> => {
    return new Observable(observer => {
      observer.next(MOCK_PAGABLE_CAR_LIST);
      observer.complete();
    });
  };

  getCar = (id: string): Observable<Car> => {
    return new Observable(observer => {
      if (id === 'errorID') {
        observer.error();
      } else {
        observer.next(MOCK_CAR_1);
      }
      observer.complete();
    });
  };
}
