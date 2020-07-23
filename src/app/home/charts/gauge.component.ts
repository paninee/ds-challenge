import { Component, NgZone, Input, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-gauge',
  template: `
  	<div [id]="chartId" style="width: 100%; height: 500px"></div>
  `
})
export class GaugeComponent implements AfterViewInit, OnDestroy {
	@Input() chartId: string;
	private chart: am4charts.GaugeChart;
	public am4charts: any;

  constructor(private zone: NgZone) {
  	this.am4charts = am4charts;
  	this.chartId = `app-gauge-${Date.now()}`;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
			let chart = am4core.create(this.chartId, am4charts.GaugeChart);
			chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
			chart.innerRadius = am4core.percent(80);

			const chartMin = 0;
			const chartMax = 100;
			const axis = chart.xAxes.push(new this.am4charts.ValueAxis());
			axis.min = 0;
			axis.max = 100;
			axis.strictMinMax = true;
			axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
			axis.renderer.grid.template.strokeOpacity = 0.3;

			const data = {
			  score: 52.7,
			  gradingData: [
			    {
			      color: "#8bc34a",
			      lowScore: 0,
			      highScore: 25
			    },
			    {
			      color: "#fdd835",
			      lowScore: 25,
			      highScore: 50
			    },
			    {
			      color: "#f57f17",
			      lowScore: 50,
			      highScore: 75
			    },
			    {
			      color: "#E92036",
			      lowScore: 75,
			      highScore: 100
			    }
			  ]
			};

			for (let grading of data.gradingData) {
			  var range = axis.axisRanges.create();
			  range.axisFill.fill = am4core.color(grading.color);
			  range.axisFill.fillOpacity = 1;
			  range.axisFill.zIndex = -1;
			  range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
			  range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
			  range.grid.strokeOpacity = 0;
			  range.stroke = am4core.color(grading.color).lighten(-0.1);
			  range.label.location = 0.5;
			  range.label.inside = true;
			  range.label.radius = am4core.percent(10);
			  range.label.paddingBottom = -5; // ~half font size
			  range.label.fontSize = "0.9em";
			}
			var hand = chart.hands.push(new am4charts.ClockHand());

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
