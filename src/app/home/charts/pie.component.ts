import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
import { DSPieChartClass } from './../../util/pie.chart';

@Component({
  selector: 'app-pie',
  template: `
  	<div [id]="chartId" style="width: 100%; height: 500px"></div>
  `
})
export class PieComponent extends DSPieChartClass implements AfterViewInit, OnDestroy {
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
