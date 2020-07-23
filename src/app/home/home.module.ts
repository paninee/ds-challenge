import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { GaugeComponent } from './charts/gauge.component';
import { PieComponent } from './charts/pie.component';
import { DounutComponent } from './charts/dounut.component';

@NgModule({
  declarations: [HomeComponent, GaugeComponent, PieComponent, DounutComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
