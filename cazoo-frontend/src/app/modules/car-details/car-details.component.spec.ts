import { NotificationService } from 'src/app/core/services/notification.service';
import { Notification } from './../../core/model/notification';
import { MOCK_CAR_1 } from '../../shared/mocks/mockCar';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of } from 'rxjs';

import { AppModule } from 'src/app/app.module';
import { CarService } from 'src/app/core/services/car.service';
import { MockCarService } from 'src/app/core/services/mocks/mock-car.service';

import { CarDetailsComponent } from './car-details.component';
import { NotificationType } from 'src/app/shared/constants/contants';

describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  let fixture: ComponentFixture<CarDetailsComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let carService: CarService;
  let notificationService: NotificationService;

  const mockID = 'mockID';
  const errorID = 'errorID';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetailsComponent],
      providers: [
        NotificationService,
        { provide: CarService, useClass: MockCarService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get() {
                  return mockID;
                }
              }
            }
          }
        }
      ],
      imports: [AppModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    carService = TestBed.inject(CarService);
    notificationService = TestBed.inject(NotificationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a car by id', async () => {
    const spyCarService = spyOn(carService, 'getCar').and.callThrough();

    fixture.detectChanges();
    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(spyCarService).toHaveBeenCalledWith(mockID);
      expect(component.car).toEqual(MOCK_CAR_1);
    });

    expect(component).toBeTruthy();
  });

  it('should throw a notification when fetch car fails', async () => {
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(errorID);
    const spyNotification = spyOn(notificationService, 'setNewNotification').and.callThrough();

    const spyCarService = spyOn(carService, 'getCar').and.callThrough();
    fixture.detectChanges();
    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(spyCarService).toHaveBeenCalledWith(errorID);
      expect(spyNotification).toHaveBeenCalledWith(
        NotificationType.NOTIFICATION_ERROR,
        `Error: Car with id errorID could not be retrieved`
      );
    });

    expect(component).toBeTruthy();
  });
});
