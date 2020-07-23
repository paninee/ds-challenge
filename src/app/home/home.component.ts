import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormGroup, FormBuilder } from '@angular/forms';

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
	
  constructor(
    private fb: FormBuilder,
  ) {
    this.initiateForm();
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
