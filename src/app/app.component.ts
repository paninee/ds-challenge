import { Component, OnInit } from '@angular/core';
import { AppService } from './util/app.service';
import { DataTransformation } from './util/data-transform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService) {}

  ngOnInit() {
  	var data = this.appService.getRecords();
    var dt = new DataTransformation(data);
    // console.log(dt.threatLevel(null));
    // console.log(dt.newCases({
    //   acquisition: 'Travel-Related'
    // }));
    // console.log(dt.ages(null));
    // console.log(dt.acquisitions(null));
    // console.log(dt.outbreakRelates(null));
    // console.log(dt.genders(null));
  }
}
