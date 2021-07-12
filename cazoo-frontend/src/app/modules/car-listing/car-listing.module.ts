import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarListingRoutingModule } from './car-listing-routing.module';
import { CarListingComponent } from './car-listing.component';

@NgModule({
  declarations: [CarListingComponent],
  imports: [SharedModule, CarListingRoutingModule, CommonModule],
})
export class CarListingModule {}
