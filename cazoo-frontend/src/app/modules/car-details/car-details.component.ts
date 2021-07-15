import { NotificationService } from './../../core/services/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/core/model/car';
import { CarService } from 'src/app/core/services/car.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit, OnDestroy {
  destroySubscriptions$ = new Subject<void>();

  route: ActivatedRoute;
  router: Router;
  notificationService: NotificationService;

  carService: CarService;
  car: Car | undefined;

  constructor(carService: CarService, route: ActivatedRoute, router: Router, notificationService: NotificationService) {
    this.carService = carService;
    this.notificationService = notificationService;
    this.route = route;
    this.router = router;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.carService
        .getCar(id)
        .pipe(takeUntil(this.destroySubscriptions$))
        .subscribe(
          response => {
            this.car = response;
          },
          err => {
            this.notificationService.setNewNotification('error', `Error: Car with id ${id} could not be retrieved`);
            this.router.navigate(['/car-listing']);
          }
        );
    }
  }

  ngOnDestroy() {
    this.destroySubscriptions$.complete();
  }
}
