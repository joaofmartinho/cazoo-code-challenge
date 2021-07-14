import { PagableCarList } from '../../../core/model/pagableCarList';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Car } from 'src/app/core/model/car';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Car>;
  pageEvent!: PageEvent;

  pagableCarList!: PagableCarList;
  carService: CarService;

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
    this.carService.getCars().subscribe(response => {
      this.pagableCarList = response;
      this.dataSource = new MatTableDataSource(this.pagableCarList.cars);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnChanges = (changes: SimpleChanges): void => {
    this.dataSource.data = changes.pagableCarList.currentValue?.cars;
  };

  getServerData = (event: PageEvent): void => {
    this.carService.getCars(event.pageIndex, event.pageSize).subscribe(response => {
      this.dataSource.data = response.cars;
    });
  };
}
