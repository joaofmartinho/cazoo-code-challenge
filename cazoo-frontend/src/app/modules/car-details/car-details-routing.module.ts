import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsComponent } from './car-details.component';

const routes: Routes = [
  {
    path: ':id',
    component: CarDetailsComponent,
  },
  {
    path: 'edit/:id',
    component: CarDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarDetailsRoutingModule {}
