import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { HomeRoutingModule } from './home-routing.module';
import { CountUpDirective } from './../util/directive/count-up.directive';
import { HomeComponent } from './home.component';
import { RiskComponent } from './charts/risk.component';
import { OutcomeComponent } from './charts/outcome.component';
import { AgeComponent } from './charts/age.component';
import { AcquisitionComponent } from './charts/acquisition.component';
import { OutbreakComponent } from './charts/outbreak.component';
import { WhereComponent } from './charts/where.component';
import { WhenComponent } from './charts/when.component';

@NgModule({
  declarations: [
  	HomeComponent,
  	RiskComponent,
  	OutcomeComponent,
  	AgeComponent,
  	AcquisitionComponent,
  	OutbreakComponent,
  	CountUpDirective,
  	WhereComponent,
  	WhenComponent
 ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    Ng5SliderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
