import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { PieChartParentClass } from './../../util/pie.chart';

@Component({
  selector: 'app-age-chart',
  template: `
  	<div [id]="chartId" style="width: 100%; height: 500px"></div>
  `
})
export class AgeChartComponent extends PieChartParentClass implements AfterViewInit, OnDestroy {
	@Input() chartId: string;
	@Input() data: any[] = [];
  @Input() dataFields: {value: any, category: string};

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.generateWidth();
  }

  constructor(private zone: NgZone) {
    super();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const colorSet = ['red', 'blue', 'green', 'black', 'pink', 'yellow', 'red', 'blue', 'green', 'pink'];
      this.createChart(colorSet);
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
