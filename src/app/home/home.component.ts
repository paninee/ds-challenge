import { Component, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { Options as ng5Options} from 'ng5-slider';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from './../util/app.service';
import { DataTransformation } from './../util/data-transform';
import { FilterInterface } from './../util/interface';

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
      newCases: this.appService.formatNumber(dt.newCases(filters)),
      threatLevel: dt.threatLevel(filters),
      ages: dt.ages(filters),
      acquisition: dt.acquisitions(filters),
      outbreakRelates: dt.outbreakRelates(filters)
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

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
