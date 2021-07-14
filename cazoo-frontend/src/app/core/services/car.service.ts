import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Car } from '../model/car';
import { PagableCarList } from './../model/pagableCarList';

@Injectable()
export class CarService {
  constructor(private http: HttpClient) {}

  private API_URL = environment.CAR_API_URL;

  getCars(pageNumber = 0, pageSize = 10): Observable<PagableCarList> {
    return this.http
      .get(`${this.API_URL}/api/cars`, {
        params: new HttpParams().set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString())
      })
      .pipe(map(res => res as PagableCarList));
  }

  getCar(id = ''): Observable<Car> {
    return this.http.get(`${this.API_URL}/api/cars/${id}`, {}).pipe(map(res => res as Car));
  }

  updateCar(id = '', car: Car): Observable<Car> {
    return this.http.put(`${this.API_URL}/api/cars/${id}` + id, car).pipe(map(res => res as Car));
  }

  createCar(id = '', car: Car): Observable<Car> {
    return this.http.post(`${this.API_URL}/api/cars/${id}` + id, car).pipe(map(res => res as Car));
  }
}
