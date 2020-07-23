import { Component, OnInit } from '@angular/core';
import { AppService } from './util/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {
  	this.appService.getRecords().subscribe(data => {
  		console.log(data);
  	},
  	error => {
  		console.error(error);
  	});
  }
}
