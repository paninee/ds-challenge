import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { PieChart } from './../../util/pie.chart';

@Component({
  selector: 'app-outbreak',
  template: `
  	<div [id]="chartId" class="pie-chart"></div>
  `
})
export class OutbreakComponent extends PieChart implements AfterViewInit, OnDestroy {
	@Input() chartId: string;
	@Input() data: any[] = [];
  @Input() dataFields: {value: any, category: string};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleViewPortChange();
  }

  constructor(private zone: NgZone) {
    super();
    this.colorSet = [
      '#E92036',
      '#0CA65C'
    ];
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
