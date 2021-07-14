import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailsEditComponent } from './car-details-edit/car-details-edit.component';
import { CarDetailsComponent } from './car-details.component';

const routes: Routes = [
  {
    path: 'create',
    component: CarDetailsEditComponent
  },
  {
    path: 'edit/:id',
    component: CarDetailsEditComponent
  },
  {
    path: ':id',
    component: CarDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarDetailsRoutingModule {}
