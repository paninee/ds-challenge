import { Component, OnInit } from '@angular/core';
import { AppService } from './util/app.service';
import { threatLevel } from './util/data-transform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {
  	this.appService.getRecords().subscribe(data => {
  		console.log(threatLevel(data, null));
  	},
  	error => {
  		console.error(error);
  	});
  }
}
