import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';

describe('CarService', () => {
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: CarService }],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
