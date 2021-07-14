import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListingComponent } from './car-listing.component';

const routes: Routes = [
  {
    path: '',
    component: CarListingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarListingRoutingModule {}
