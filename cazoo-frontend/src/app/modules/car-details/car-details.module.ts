import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarDetailsComponent } from './../car-details/car-details.component';
import { CarDetailsRoutingModule } from './car-details-routing.module';
import { CarDetailsEditComponent } from './car-details-edit/car-details-edit.component';

@NgModule({
  declarations: [CarDetailsComponent, CarDetailsEditComponent],
  imports: [
    SharedModule,
    CarDetailsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS,
    },
  ],
})
export class CarDetailsModule {}
