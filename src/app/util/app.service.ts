import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import dl from 'datalib';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getRecords():Observable<any> {
    return dl.csv('assets/OntarioCovid19Cases.csv');
  }

  trackByFn(index, item): void {
    return index;
  }

  formatNumber(number: number, decimalCount: number = 0) {
    var num = number.toFixed(decimalCount);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
}
