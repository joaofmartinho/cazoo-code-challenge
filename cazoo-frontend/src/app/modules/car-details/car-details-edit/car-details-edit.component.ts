import { NotificationService } from 'src/app/core/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Car } from 'src/app/core/model/car';
import { CarMaker } from 'src/app/core/model/carMaker';
import { CarModel } from 'src/app/core/model/carModel';
import { CarService } from 'src/app/core/services/car.service';
import { MOCK_CAR_MAKER_LIST } from 'src/app/shared/constants/mocks/mockCarMakers';
import { Subject } from 'rxjs';

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

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(() => {
        this.action = this.router.url.split('/')[2];
      });
  }

  ngOnInit(): void {
    this.carForm = this.createForm();

    if (this.action === 'edit') {
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
    console.log(this.carForm);
    if (this.carForm.valid) {
      this.car = Object.assign(this.car, this.carForm.value);

      if (this.action === 'edit') {
        this.carService.updateCar(this.car.id, this.car).subscribe(
          () => {
            this.notificationService.setNewNotification('success', `Car edited with success`);
            this.router.navigate(['/car-listing']);
          },
          () => {
            this.notificationService.setNewNotification(
              'error',
              `Error: An error occurred white editing the car with id ${this.car.id}`
            );
            return false;
          }
        );
      } else if (this.action === 'create') {
        this.carService
          .createCar(this.car.id, this.car)
          .pipe(takeUntil(this.destroySubscriptions$))
          .subscribe(
            () => {
              this.notificationService.setNewNotification('success', `Car created with success`);
              this.router.navigate(['/car-listing']);
            },
            () => {
              this.notificationService.setNewNotification('error', `Error: An error occurred while creating the car`);
              return false;
            }
          );
      }
    } else {
      Object.keys(this.carForm.controls).forEach(field => {
        const control = this.carForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  };

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

  /* Auxiliary function check if the control contains any given error */
  hasControlError = (controlName: string, toVerifyErrors: string[]): boolean => {
    if (!this.carForm.controls[controlName].errors) {
      return false;
    } else if (!this.carForm.controls[controlName].touched) {
      return false;
    }

    const errors = Object.keys(this.carForm.controls[controlName].errors as Object);
    let hasError: boolean = false;

    toVerifyErrors.forEach(errorName => {
      if (errors.includes(errorName)) {
        hasError = true;
      }
    });

    return hasError;
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

  ngOnDestroy = () => {
    this.destroySubscriptions$.complete();
  };
}
