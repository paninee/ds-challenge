import { Component, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { Options as ng5Options} from 'ng5-slider';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from './../util/app.service';
import { DataTransformation } from './../util/data-transform';
import { FilterInterface } from './../util/interface';
import { CountUp, CountUpOptions } from 'countup.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnDestroy {
  private formChangesSubscription: Subscription;
  public reportsMetaData: any;
	public showAdvanceFilter: boolean;
  public sliderOptions: ng5Options;
  public searchForm: FormGroup;
  public selectOptions: {acquisition: any, outcome: any};
  public records: any;
  public countOpts: CountUpOptions = {duration: 5};
  public genders: string[] = [];
	
  constructor(
    private fb: FormBuilder,
    public appService: AppService
  ) {
    this.generateDefaultValues();
    this.initiateForm();
    this.generateReports();
  }

  generateReports(filters: FilterInterface = {}): void {
    const data = this.records;
    const dt = new DataTransformation(data);
    this.reportsMetaData = {
      newCases: dt.newCases(filters),
      threatLevel: dt.threatLevel(filters),
      ages: dt.ages(filters),
      acquisition: dt.acquisitions(filters),
      outbreakRelates: dt.outbreakRelates(filters),
      genders: this.generateGenders(dt.genders(filters)),
      map: dt.whereMap(filters),
      whenChart: dt.whenChart(filters)
    };
  }

  initiateForm(): void {
    this.searchForm = this.fb.group({
      gender: [''],
      acquisition: [''],
      outcome: [''],
      isOutbreakRelated: true,
      minAge: [30],
      maxAge: [60]
    });

    this.listenToFormChanges();
  }

  listenToFormChanges(): void {
    this.formChangesSubscription =
      this.searchForm.valueChanges
        .pipe(
          debounceTime(750),
          distinctUntilChanged()
        ).subscribe(changes => {
          this.generateReports(changes);
        }
      );
  }

  resetFilter(): void {
    this.searchForm.reset({
      gender: '',
      acquisition: '',
      outcome: '',
      outbreakRelated: true,
      minAge: [30],
      maxAge: [60]
    });
    this.generateReports();
  }

  updateForm(field: string, value: string): void {
    const formControl = this.searchForm.get(field);
    if (formControl) {
      formControl.setValue(value);
    }
  }

  generateDefaultValues(): void {
    this.selectOptions = {
      acquisition: [
        {key: 'Contact of a confirmed case', name: 'Contact of a confirmed case'},
        {key: 'Travel-Related', name: 'Travel-Related'},
        {key: 'Information pending', name: 'Information pending'},
        {key: 'Neither', name: 'Neither'}
      ],
      outcome: [
        {key: 'Resolved', name: 'Resolved'},
        {key: 'Not Resolved', name: 'Not Resolved'},
        {key: 'Fatal', name: 'Fatal'}
      ]
    };

    this.sliderOptions = {floor: 0, ceil: 100, animate: false};
    this.records = this.appService.getRecords();
  }

  generateGenders(genderObj: {male: number, female: number, other?: number}): void {
    this.genders = [];
    for (const field in genderObj) {
      for (var i = 1; i <= genderObj[field]; i++) {
        this.genders.push(field);
      }
    }
  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
