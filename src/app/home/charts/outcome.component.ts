import { Component, NgZone, Input, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-outcome',
  template: `
  	<div [id]="chartId" class="donut-chart"></div>
  `
})
export class OutcomeComponent implements OnChanges, AfterViewInit, OnDestroy {
	@Input() chartId: string;
	@Input() data: any;
	private chart: am4charts.PieChart;
	public am4charts: any;
  public label: any;

  constructor(private zone: NgZone) {
  	this.am4charts = am4charts;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.firstChange && changes.data.currentValue) {
      this.chart.data = changes.data.currentValue.data;
      this.label.text = `${changes.data.currentValue.fatalPercentage}%`;
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(this.chartId, am4charts.PieChart);
			chart.data = this.data.data;

			// Set inner radius
			chart.innerRadius = am4core.percent(55);

			// Add and configure Series
			const pieSeries = chart.series.push(new am4charts.PieSeries());
			pieSeries.dataFields.value = "count";
			pieSeries.dataFields.category = "Outcome1";

			pieSeries.slices.template.stroke = am4core.color("#fff");
			pieSeries.slices.template.strokeWidth = 3;
			pieSeries.slices.template.strokeOpacity = 1;
			pieSeries.ticks.template.disabled = true;
			pieSeries.alignLabels = false;
			pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
      pieSeries.colors.list = [
        am4core.color('#E92036'),
        am4core.color('#6C6C6C'),
        am4core.color('#0CA65C')
      ];

			const label = pieSeries.createChild(am4core.Label);
			label.text = `${this.data.fatalPercentage}%`;
			label.horizontalCenter = "middle";
			label.verticalCenter = "middle";
			label.fontSize = 50;
      label.fill = am4core.color('#E92036');

      const label2 = pieSeries.createChild(am4core.Label);
      label2.horizontalCenter = "none";
      label2.verticalCenter = "middle";
      label2.marginTop = 100;
      label2.fontSize = 15;
      label2.text = "Fatal";
      label2.textValign = "bottom";
      label2.fill = am4core.color('#6C6C6C');

      this.label = label;
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
