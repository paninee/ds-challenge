import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { PieChart } from './../../util/pie.chart';

@Component({
  selector: 'app-acquisition-chart',
  template: `
  	<div [id]="chartId" class="pie-chart"></div>
  `
})
export class AcquisitionChartComponent extends PieChart implements AfterViewInit, OnDestroy {
	@Input() chartId: string;
	@Input() data: any[] = [];
  @Input() dataFields: {value: any, category: string};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.generateWidth();
  }

  constructor(private zone: NgZone) {
    super();
    this.colorSet = [
      '#F1C27D',
      '#abacac',
      '#9f1827',
      '#68C9F7'
    ];
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.createChart();
    });
  }

  generateWidth(): void {
    if (document.body.clientWidth <= 930 ) {
      console.log(this.chart.series);
    }
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
