import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { PieChart } from './../../util/pie.chart';

@Component({
  selector: 'app-age',
  template: `
  	<div [id]="chartId" class="pie-chart"></div>
  `
})
export class AgeComponent extends PieChart implements AfterViewInit, OnDestroy {
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

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.createChart();
    });
  }

  generateWidth(): void {
    if (document.body.clientWidth <= 930 ) {
      // console.log(this.chart.series);
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
