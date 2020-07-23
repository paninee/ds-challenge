import { Component, OnInit } from '@angular/core';
import { AppService } from './util/app.service';
import { threatLevel, newCases, ages } from './util/data-transform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {
  	var data = this.appService.getRecords();
    console.log(threatLevel(data, null));
    console.log(newCases(data, null));
    console.log(ages(data, null));
  }
}
