import { Component, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { Options } from 'ng5-slider';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from './../util/app.service';
import { DataTransformation } from './../util/data-transform';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnDestroy {
  private formChangesSubscription: Subscription;
  public reportsMetaData: any;

	public showAdvanceFilter: boolean;
  public sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    animate: false
  };
  public searchForm: FormGroup;
  public selectOptions: {acquisition: any, outcome: any};
	
  constructor(
    private fb: FormBuilder,
    public appService: AppService
  ) {
    this.initiateForm();
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
    this.generateReports();
  }

  generateReports(): void {
    const data = this.appService.getRecords();
    const dt = new DataTransformation(data);
    this.reportsMetaData = {
      newCases: this.appService.formatNumber(dt.newCases({acquisition: 'Travel-Related'})),
      threatLevel: dt.threatLevel(null),
      ages: dt.ages(null).map(x => { return {value: x.count, label: x.Age_Group}; }),
      acquisition: dt.acquisitions(null).map(x => { return {value: x.count, label: x.Case_AcquisitionInfo}; }),
      outbreakRelates: dt.outbreakRelates(null).map(x => { return {value: x.count, label: x.Outbreak_Related}; })
    }
  }

  initiateForm(): void {
    this.searchForm = this.fb.group({
      gender: [''],
      acquisition: [''],
      outcome: [''],
      outbreakRelated: true,
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
          this.prepareFields();
        }
      );
  }

  resetFilter(): void {
    this.searchForm.reset({
      gender: '',
      acquisition: '',
      outcome: '',
      outbreakRelated: true
    });
  }

  prepareFields(): void {
    // this.showAdvanceFilter = !this.showAdvanceFilter;
    console.log(this.searchForm.value);
  }

  updateForm(field: string, value: string): void {
    const formControl = this.searchForm.get(field);
    if (formControl) {
      formControl.setValue(value);
    }

  }

  ngOnDestroy() {
    if (this.formChangesSubscription) {
      this.formChangesSubscription.unsubscribe();
    }
  }
}
