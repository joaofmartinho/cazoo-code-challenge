import { PagableCarList } from '../../../core/model/pagableCarList';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/core/model/car';
import { CarService } from 'src/app/core/services/car.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  pageSizeOptions = [10, 20, 50];

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

  constructor(carService: CarService) {
    this.carService = carService;
  }

  ngOnInit(): void {
    this.carService
      .getCars()
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(response => {
        this.pagableCarList = response;
        this.dataSource = new MatTableDataSource(this.pagableCarList.cars);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  getServerData = (event: PageEvent): void => {
    this.carService
      .getCars(event.pageIndex, event.pageSize)
      .pipe(takeUntil(this.destroySubscriptions$))
      .subscribe(response => {
        this.dataSource.data = response.cars;
      });
  };

  ngOnDestroy() {
    this.destroySubscriptions$.next();
    this.destroySubscriptions$.complete();
  }
}
