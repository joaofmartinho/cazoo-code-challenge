import { NotificationService } from 'src/app/core/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Car } from 'src/app/core/model/car';
import { CarMaker } from 'src/app/core/model/carMaker';
import { CarModel } from 'src/app/core/model/carModel';
import { CarService } from 'src/app/core/services/car.service';
import { MOCK_CAR_MAKER_LIST } from 'src/app/shared/mocks/mockCarMakers';
import { Subject } from 'rxjs';
import { CarDetailActions, NotificationType } from 'src/app/shared/constants/contants';

@Component({
  selector: 'app-car-details-edit',
  templateUrl: './car-details-edit.component.html',
  styleUrls: ['./car-details-edit.component.scss']
})
export class CarDetailsEditComponent implements OnInit {
  destroySubscriptions$ = new Subject<void>();

  notificationService: NotificationService;

  action: string = '';
  readonly: boolean = true;
  route: ActivatedRoute;
  router: Router;
  formBuilder: FormBuilder;
  carService: CarService;
  car: Car = {} as Car;
  carForm: FormGroup = {} as FormGroup;
  startDate: Date;

  /* TODO:// Get this value from database */
  carMakerList = MOCK_CAR_MAKER_LIST;

  /* Contant Select Inputs */
  makerSelection: CarMaker[] = this.carMakerList;
  modelSelection: CarModel[] = [];
  colorSelection: string[] = [];
  transmissionSelection: string[] = [];
  fuelTypeSelection: string[] = [];

  constructor(
    carService: CarService,
    route: ActivatedRoute,
    formBuilder: FormBuilder,
    router: Router,
    notificationService: NotificationService
  ) {
    this.notificationService = notificationService;
    this.carService = carService;
    this.route = route;
    this.router = router;
    this.formBuilder = formBuilder;
    this.startDate = new Date();
  }

  ngOnInit(): void {
    this.action = this.router.url.split('/')[2];
    this.carForm = this.createForm();

    if (this.action === CarDetailActions.EDIT_CAR) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.carService
          .getCar(id)
          .pipe(takeUntil(this.destroySubscriptions$))
          .subscribe(response => {
            this.car = response;
            this.carForm.patchValue(this.car);
            this.onSelectCarMaker();
            this.onSelectCarModel();
          });
      }
    }
  }

  onSubmit = () => {
    /* If form has any errors mark all controls as touched */
    if (!this.carForm.valid) {
      Object.keys(this.carForm.controls).forEach(field => {
        const control = this.carForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    } else {
      /* Assign form value to car */
      this.car = Object.assign(this.car, this.carForm.value);

      if (this.action === CarDetailActions.EDIT_CAR) {
        this.editCar(this.car.id, this.car);
      } else if (this.action === CarDetailActions.CREATE_CAR) {
        this.createCar(this.car);
      }
    }
  };

  /* Enables/Disables model based on maker value */
  onSelectCarMaker = (): void => {
    if (!this.carForm.controls.maker.value) {
      this.modelSelection = [];
      this.carForm.controls.model.disable();
    } else {
      const selectedMaker = this.makerSelection.find(maker => maker.name === this.carForm.controls.maker.value);

      if (selectedMaker) {
        this.modelSelection = selectedMaker.models;
        this.carForm.controls.model.enable();
      }
    }
  };

  /* Enables/Disables form controls based on model value */
  onSelectCarModel = (): void => {
    if (!this.carForm.controls.model.value) {
      this.colorSelection = [];
      this.carForm.controls.color.disable();
      this.fuelTypeSelection = [];
      this.carForm.controls.fuelType.disable();
      this.transmissionSelection = [];
      this.carForm.controls.transmission.disable();
    } else {
      const selectedModel = this.modelSelection.find(model => model.name === this.carForm.controls.model.value);

      if (selectedModel) {
        this.colorSelection = selectedModel.colors;
        this.carForm.controls.color.enable();
        this.fuelTypeSelection = selectedModel.fuelType;
        this.carForm.controls.fuelType.enable();
        this.transmissionSelection = selectedModel.transmission;
        this.carForm.controls.transmission.enable();
      }
    }
  };

  /* Return true if form contains any of the error names given */
  hasControlError = (controlName: string, toVerifyErrors: string[]): boolean => {
    if (!this.carForm.controls[controlName].errors || !this.carForm.controls[controlName].touched) {
      return false;
    }

    const errors = Object.keys(this.carForm.controls[controlName].errors as Object);
    const filteredArray = errors.filter(error => toVerifyErrors.includes(error));

    return filteredArray.length !== 0;
  };

  createForm = () => {
    return this.formBuilder.group({
      maker: ['', Validators.required],
      model: [{ value: '', disabled: true }, Validators.required],
      color: [{ value: '', disabled: true }, Validators.required],
      year: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.min(1970),
          Validators.max(2021),
          Validators.pattern('^[0-9]*$')
        ]
      ],
      subscriptionPrice: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$')]
      ],
      availableFrom: ['', Validators.required],
      fuelType: [{ value: '', disabled: true }],
      mileage: ['', Validators.pattern('^[0-9]*$')],
      transmission: [{ value: '', disabled: true }],
      seats: ['', [Validators.pattern('^[0-9]*$'), Validators.min(1)]]
    });
  };

  editCar = (id: string, car: Car) => {
    this.carService.updateCar(id, car).subscribe(
      () => {
        this.notificationService.setNewNotification(NotificationType.NOTIFICATION_SUCCESS, `Car edited with success`);
        this.router.navigate(['/car-listing']);
      },
      () => {
        this.notificationService.setNewNotification(
          NotificationType.NOTIFICATION_ERROR,
          `Error: An error occurred white editing the car with id ${this.car.id}`
        );
        return false;
      }
    );
  };

  createCar = (car: Car) => {
    this.carService
      .createCar(car)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(
        () => {
          this.notificationService.setNewNotification(
            NotificationType.NOTIFICATION_SUCCESS,
            `Car created with success`
          );
          this.router.navigate(['/car-listing']);
        },
        () => {
          this.notificationService.setNewNotification(
            NotificationType.NOTIFICATION_ERROR,
            `Error: An error occurred while creating the car`
          );
          return false;
        }
      );
  };

  ngOnDestroy = () => {
    this.destroySubscriptions$.complete();
  };
}
