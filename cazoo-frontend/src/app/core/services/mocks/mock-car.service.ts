import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from 'src/app/core/services/car.service';
import { PagableCarList } from '../../model/pagableCarList';
import { Car } from '../../model/car';
import { MOCK_PAGABLE_CAR_LIST } from 'src/app/shared/mocks/mockPagableCarList';
import { MOCK_CAR_1 } from 'src/app/shared/mocks/mockCar';

@Injectable()
export class MockCarService extends CarService {
  getCars = (pageNumber = 0, pageSize = 2): Observable<PagableCarList> => {
    return new Observable(observer => {
      observer.next(MOCK_PAGABLE_CAR_LIST);
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

  updateCar = (id: string, updatedCar: Car): Observable<Car> => {
    return new Observable(observer => {
      observer.next(MOCK_CAR_1);
      observer.complete();
    });
  };

  createCar = (car: Car): Observable<Car> => {
    return new Observable(observer => {
      observer.next(MOCK_CAR_1);
      observer.complete();
    });
  };
}
