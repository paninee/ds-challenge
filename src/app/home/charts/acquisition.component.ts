import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { PieChart } from './../../util/pie.chart';

@Component({
  selector: 'app-acquisition',
  template: `
  	<div [id]="chartId" class="pie-chart"></div>
  `
})
export class AcquisitionComponent extends PieChart implements OnChanges, AfterViewInit, OnDestroy {
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
      '#F1C27D',
      '#6C6C6C',
      '#9f1827',
      '#68C9F7'
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
