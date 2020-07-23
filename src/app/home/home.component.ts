import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	public showAdvanceFilter: boolean;
	public sliderValue: number = 30;
  public sliderHighValue: number = 60;
  public sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    animate: false
  };
	
  constructor() { }

  ngOnInit() {
  }

}
