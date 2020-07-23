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
			chart.data = [ {
			  "country": "Lithuania",
			  "litres": 501.9
			}, {
			  "country": "Czechia",
			  "litres": 301.9
			}, {
			  "country": "Ireland",
			  "litres": 201.1
			}, {
			  "country": "Germany",
			  "litres": 165.8
			}, {
			  "country": "Australia",
			  "litres": 139.9
			}, {
			  "country": "Austria",
			  "litres": 128.3
			}, {
			  "country": "UK",
			  "litres": 99
			}, {
			  "country": "Belgium",
			  "litres": 60
			}, {
			  "country": "The Netherlands",
			  "litres": 50
			} ];

			// Add and configure Series
			var pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = "litres";
			pieSeries.dataFields.category = "country";
			pieSeries.slices.template.stroke = am4core.color("#fff");
			pieSeries.slices.template.strokeWidth = 2;
			pieSeries.slices.template.strokeOpacity = 1;

			// This creates initial animation
			pieSeries.hiddenState.properties.opacity = 1;
			pieSeries.hiddenState.properties.endAngle = -90;
			pieSeries.hiddenState.properties.startAngle = -90;

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
