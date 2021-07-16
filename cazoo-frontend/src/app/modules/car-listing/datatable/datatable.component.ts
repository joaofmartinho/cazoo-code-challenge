import { NotificationService } from './../../../core/services/notification.service';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/core/model/car';
import { CarService } from 'src/app/core/services/car.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PagableCarList } from 'src/app/core/model/pagableCarList';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/shared/constants/contants';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroySubscriptions$ = new Subject<void>();

  dataSource!: MatTableDataSource<Car>;
  pageEvent!: PageEvent;

  pagableCarList!: PagableCarList;
  carService: CarService;
  notificationService: NotificationService;

  pageSizeOptions = [10, 20, 50];
  pageSize = 10;

  displayedColumns: string[] = [
    'maker',
    'model',
    'year',
    'color',
    'subscriptionPrice',
    'availableFrom',
    'actions',
    'administration'
  ];
  router: Router;

  constructor(router: Router, carService: CarService, notificationService: NotificationService) {
    this.notificationService = notificationService;
    this.carService = carService;
    this.router = router;
  }

  ngOnInit(): void {
    this.carService
      .getCars(0, this.pageSize)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(
        response => {
          this.pagableCarList = response;
          this.dataSource = new MatTableDataSource(this.pagableCarList.cars);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        () => {
          this.notificationService.setNewNotification(
            NotificationType.NOTIFICATION_ERROR,
            `Error: An error occurred while getting the car list`
          );
          this.router.navigate(['/']);
        }
      );
  }

  getServerData = (event: PageEvent): void => {
    this.carService
      .getCars(event.pageIndex, event.pageSize)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(
        response => {
          this.dataSource.data = response.cars;
        },
        () => {
          this.notificationService.setNewNotification(
            NotificationType.NOTIFICATION_ERROR,
            `Error: An error occurred while getting the car list`
          );
          return false;
        }
      );
  };

  ngOnDestroy() {
    this.destroySubscriptions$.next();
    this.destroySubscriptions$.complete();
  }
}
