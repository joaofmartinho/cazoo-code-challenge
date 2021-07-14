import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Car } from 'src/app/core/model/car';
import { CarService } from 'src/app/core/services/car.service';
import { CarMaker } from './../../core/model/carMaker';
import { CarModel } from './../../core/model/carModel';
import { MOCK_CAR_MAKER_LIST } from '../../shared/constants/mocks/mockCarMakers';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  action: string = '';
  readonly: boolean = true;
  id = '0';
  route: ActivatedRoute;
  router: Router;
  formBuilder: FormBuilder;
  carService: CarService;
  car: Car = {} as Car;
  carForm: FormGroup = {} as FormGroup;

  carMakerList = MOCK_CAR_MAKER_LIST;

  /* Contant Select Inputs */
  makerSelection: CarMaker[] = this.carMakerList;
  modelSelection: CarModel[] = [];
  colorSelection: string[] = [];
  transmissionSelection: string[] = [];
  fuelTypeSelection: string[] = [];

  constructor(carService: CarService, route: ActivatedRoute, formBuilder: FormBuilder, router: Router) {
    this.carService = carService;
    this.route = route;
    this.router = router;
    this.formBuilder = formBuilder;

    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.action = this.router.url.split('/')[2];
      if (this.action === 'edit' || this.action == 'create') {
        this.readonly = false;
      }
    });
  }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
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
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      subscriptionPrice: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      availableFrom: ['', Validators.required],
      fuelType: [{ value: '', disabled: true }],
      mileage: ['', Validators.pattern('^[0-9]*$')],
      transmission: [{ value: '', disabled: true }],
      seats: ['', [Validators.pattern('^[0-9]*$'), Validators.min(1)]],
    });

    console.log();
    if (this.action !== 'create') {
      const id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.carService.getCar(id).subscribe(response => {
          this.car = response;

          this.carForm.patchValue(this.car);
          this.onSelectCarMaker();
          this.onSelectCarModel();
        });
      }
    }
  }

  onSubmit() {
    if (this.carForm.valid) {
      console.log('form submitted');
      this.car = Object.assign(this.car, this.carForm.value);
      if (this.action === 'edit') {
        this.carService.updateCar(this.car.id, this.car).subscribe(response => {});
      } else if (this.action === 'create') {
        this.carService.createCar(this.car.id, this.car).subscribe(response => {});
      }
      this.router.navigate(['/car-listing']);
    } else {
      Object.keys(this.carForm.controls).forEach(field => {
        const control = this.carForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log(this.carForm.controls);
    }
  }

  onSelectCarMaker() {
    console.log('CHANGED');

    if (this.carForm.controls.maker) {
      const selectedMaker = this.makerSelection.find(maker => maker.name === this.carForm.controls.maker.value);

      if (selectedMaker) {
        this.modelSelection = selectedMaker.models;
        this.carForm.controls.model.enable();
      }
    }
    return;
  }

  onSelectCarModel() {
    if (this.carForm.controls.model) {
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
    return;
  }

  /* Auxiliary function check if the control contains any given error */
  hasControlError(controlName: string, toVerifyErrors: string[]): boolean {
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
  }

  checkDisabledFields() {
    if (this.carForm.controls.maker.value == '') {
      this.carForm.controls.model.disable();
    }

    if (this.carForm.controls.model.value == '') {
    }
  }
}
