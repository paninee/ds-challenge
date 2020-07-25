import { Component, NgZone, Input, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-outcome',
  template: `
  	<div [id]="chartId" class="pie-chart"></div>
  `
})
export class OutcomeComponent implements AfterViewInit, OnDestroy {
	@Input() chartId: string;
	@Input() data: any;
	private chart: am4charts.PieChart;
	public am4charts: any;

  constructor(private zone: NgZone) {
  	this.am4charts = am4charts;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(this.chartId, am4charts.PieChart);
			chart.data = this.data.data;

			// Set inner radius
			chart.innerRadius = am4core.percent(50);

			// Add and configure Series
			const pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = "count";
			pieSeries.dataFields.category = "Outcome1";

			pieSeries.slices.template.stroke = am4core.color("#fff");
			pieSeries.slices.template.strokeWidth = 2;
			pieSeries.slices.template.strokeOpacity = 1;
			pieSeries.ticks.template.disabled = true;
			pieSeries.alignLabels = false;
			pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";

			const label = pieSeries.createChild(am4core.Label);
			label.text = `${this.data.fatalPercentage}%`;
			label.horizontalCenter = "middle";
			label.verticalCenter = "middle";
			label.fontSize = 20;

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
