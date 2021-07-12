import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [SharedModule, LandingRoutingModule, CommonModule],
})
export class LandingModule {}
