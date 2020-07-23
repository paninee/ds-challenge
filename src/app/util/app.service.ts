import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { csvJSON } from './helpers';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getRecords():Observable<any> {
	  return this.httpClient.get(`assets/OntarioCovid19Cases.csv`, {responseType: 'text'}).pipe(
	      map(response => {
	        return csvJSON(response);
	      })
	    );
	  }
}
