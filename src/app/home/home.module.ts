import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { GaugeComponent } from './charts/gauge.component';
import { DounutComponent } from './charts/dounut.component';
import { AgeChartComponent } from './charts/age-chart.component';
import { AcquisitionChartComponent } from './charts/acquisition-chart.component';
import { OutbreakChartComponent } from './charts/outbreak-chart.component';

@NgModule({
  declarations: [HomeComponent, GaugeComponent, DounutComponent, AgeChartComponent, AcquisitionChartComponent, OutbreakChartComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
