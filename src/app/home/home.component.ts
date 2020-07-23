import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from './../util/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	public showAdvanceFilter: boolean;
	public sliderValue: number = 30;
  public sliderHighValue: number = 60;
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
  }

  ngOnInit() {
  }

  initiateForm(): void {
    this.searchForm = this.fb.group({
      gender: [''],
      acquisition: [''],
      outcome: [''],
      outbreakRelated: true
    });
  }

  selectGender(gender: string): void {
    this.searchForm.get('gender').setValue(gender);
  }

  resetFilter(): void {
    this.searchForm.reset({
      gender: '',
      acquisition: '',
      outcome: '',
      outbreakRelated: true
    });
  }

}
