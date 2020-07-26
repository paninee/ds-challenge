import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { PieChart } from './../../util/pie.chart';

@Component({
  selector: 'app-outbreak',
  template: `
  	<div [id]="chartId" class="pie-chart"></div>
  `
})
export class OutbreakComponent extends PieChart implements OnChanges, AfterViewInit, OnDestroy {
  public dataFields: {value: any, category: string} = {value: 'count', category: 'Outbreak_Related'};
	@Input() chartId: string;
	@Input() data: any[] = [];
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
