import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { PieChart } from './../../util/pie.chart';

@Component({
  selector: 'app-age',
  template: `
  	<div [id]="chartId" class="pie-chart"></div>
  `
})
export class AgeComponent extends PieChart implements OnChanges, AfterViewInit, OnDestroy {
  public dataFields: {value: any, category: string} = {value: 'count', category: 'Age_Group'};
	@Input() chartId: string;
	@Input() data: any[] = [];
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleViewPortChange();
  }

  constructor(private zone: NgZone) {
    super();
    this.colorSet = [
      '#263d51',
      '#324b65',
      '#3a647a',
      '#4f7a95',
      '#689ebf',
      '#76b2d5',
      '#69c8ed',
      '#70d7ff',
      '#172e34',
      '#7b7c7c'
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.firstChange && changes.data.currentValue) {
      this.chart.data = changes.data.currentValue;
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.createChart();
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
