import { Component, NgZone, Input, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-pie',
  template: `
  	<div [id]="chartId" style="width: 100%; height: 500px"></div>
  `
})
export class PieComponent implements AfterViewInit, OnDestroy {
	@Input() chartId: string;
	@Input() data: any[] = [];
	private chart: am4charts.PieChart;
	public am4charts: any;

  constructor(private zone: NgZone) {
  	this.am4charts = am4charts;
  	this.chartId = `app-pie-${Date.now()}`;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(this.chartId, am4charts.PieChart);

			// Add data
			chart.data = this.data;

			// Add and configure Series
			var pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = "value";
			pieSeries.dataFields.category = "label";

			pieSeries.ticks.template.disabled = true;
			pieSeries.alignLabels = false;
			pieSeries.labels.template.text = "[bold]{category}\n{value.percent.formatNumber('#.0')}%[/]";
			pieSeries.labels.template.radius = am4core.percent(-40);
			pieSeries.labels.template.fill = am4core.color("white");

      this.chart = chart;
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
