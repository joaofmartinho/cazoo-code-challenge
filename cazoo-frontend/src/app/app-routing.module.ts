import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'car-listing',
    loadChildren: () => import('./modules/car-listing/car-listing.module').then(m => m.CarListingModule),
  },
  {
    path: 'car-details',
    loadChildren: () => import('./modules/car-details/car-details.module').then(m => m.CarDetailsModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule),
  },
  /*  {
    path: '**',
    redirectTo: '',
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
