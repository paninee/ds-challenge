import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { csvJSON } from './util/helpers'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public userArray: any[] = [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
  	this.httpClient.get(`assets/OntarioCovid19Cases.csv`, {responseType: 'text'}).subscribe(data => {
  		const json = csvJSON(data);
  		console.log(json);
  	},
  	error => {
  		console.log(error);
  	});
  }
}
