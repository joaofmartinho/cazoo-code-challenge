import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarListingRoutingModule } from './car-listing-routing.module';
import { CarListingComponent } from './car-listing.component';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
  declarations: [CarListingComponent, DatatableComponent],
  imports: [
    SharedModule,
    CarListingRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class CarListingModule {}
