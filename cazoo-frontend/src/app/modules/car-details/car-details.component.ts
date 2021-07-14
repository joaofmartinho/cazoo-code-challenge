import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/core/model/car';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  route: ActivatedRoute;

  carService: CarService;
  car: Car = {} as Car;

  constructor(carService: CarService, route: ActivatedRoute) {
    this.carService = carService;
    this.route = route;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.carService.getCar(id).subscribe(response => {
        this.car = response;
      });
    }
  }
}
