import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { CarService } from 'src/app/core/services/car.service';
import { MockCarService } from 'src/app/core/services/mocks/mock-car.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MOCK_CAR_1 } from 'src/app/shared/mocks/mockCar';

import { CarDetailsEditComponent } from './car-details-edit.component';

describe('CarDetailsEditComponent', () => {
  let component: CarDetailsEditComponent;
  let fixture: ComponentFixture<CarDetailsEditComponent>;
  let router: Router;
  let carService: CarService;
  let notificationService: NotificationService;
  let routerUrlSpy: any;

  const mockID = 'mockID';
  const errorID = 'errorID';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarDetailsEditComponent],
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
      imports: [AppModule, ReactiveFormsModule]
    }).compileComponents();
    router = TestBed.inject(Router);
    routerUrlSpy = spyOnProperty(router, 'url', 'get').and.returnValue('/car-details/edit/mockID');
    carService = TestBed.inject(CarService);
    notificationService = TestBed.inject(NotificationService);
    fixture = TestBed.createComponent(CarDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a car by id when editing', async () => {
    const spyCarService = spyOn(carService, 'getCar').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spyCarService).toHaveBeenCalledWith(mockID);
      expect(component.car).toEqual(MOCK_CAR_1);
    });
  });

  it('should not fetch a car when creating', async () => {
    routerUrlSpy.and.returnValue('/car-details/create');
    const spyCarService = spyOn(carService, 'getCar').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(spyCarService).toHaveBeenCalledTimes(0);
    });
  });

  it('should not submit and create when form has errors', async () => {
    routerUrlSpy.and.returnValue('/car-details/create');
    const spyCarService = spyOn(carService, 'createCar').and.callThrough();
    const spyOnSubmit = spyOn(component, 'onSubmit').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();

    let button = fixture.debugElement.nativeElement.querySelector('#button-submit');
    button.click();

    fixture.whenStable().then(() => {
      expect(spyOnSubmit).toHaveBeenCalledTimes(1);
      expect(component.carForm.valid).toBeFalsy();
      expect(spyCarService).toHaveBeenCalledTimes(0);
    });
  });

  it(
    'should submit and create',
    <any>fakeAsync((): void => {
      routerUrlSpy.and.returnValue('/car-details/create');
      const spyCarService = spyOn(carService, 'createCar').and.callThrough();
      const spyOnSubmit = spyOn(component, 'onSubmit').and.callThrough();

      component.ngOnInit();
      fixture.detectChanges();

      let makerEl = fixture.debugElement.nativeElement.querySelector('#maker-input-group select');
      makerEl.selectedIndex = 1;
      makerEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      let modelEl = fixture.debugElement.nativeElement.querySelector('#model-input-group select');
      modelEl.selectedIndex = 1;
      modelEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      let yearEL = fixture.debugElement.nativeElement.querySelector('#year-input-group input');
      yearEL.value = '2020';
      yearEL.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      let colorEl = fixture.debugElement.nativeElement.querySelector('#color-input-group select');
      colorEl.selectedIndex = 1;
      colorEl.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      let availableFromEl = fixture.debugElement.nativeElement.querySelector('#availableFrom-input-group input');
      availableFromEl.value = '20/12/2021';
      availableFromEl.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      let subscriptionPriceEL = fixture.debugElement.nativeElement.querySelector(
        '#subscriptionPrice-input-group input'
      );
      subscriptionPriceEL.value = '1200';
      subscriptionPriceEL.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      let button = fixture.debugElement.nativeElement.querySelector('#button-submit');
      button.click();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(spyOnSubmit).toHaveBeenCalledTimes(1);
        expect(component.carForm.valid).toBeTruthy();
        expect(spyCarService).toHaveBeenCalledTimes(1);
      });
    })
  );
});
