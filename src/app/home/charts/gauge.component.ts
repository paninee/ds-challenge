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
	@Input() threatLevel: {label: string, score: number} = {label: 'n/a', score: 0};
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
			chart.fontSize = 11;
			chart.innerRadius = am4core.percent(80);
			chart.resizable = true;

			const chartMin = 0;
			const chartMax = 100;

			var axis = chart.xAxes.push(new this.am4charts.ValueAxis());
			axis.min = chartMin;
			axis.max = chartMax;
			axis.strictMinMax = true;
			axis.renderer.radius = am4core.percent(80);
			axis.renderer.inside = true;
			axis.renderer.line.strokeOpacity = 0.1;
			axis.renderer.ticks.template.disabled = false;
			axis.renderer.ticks.template.strokeOpacity = 1;
			axis.renderer.ticks.template.strokeWidth = 0.5;
			axis.renderer.ticks.template.length = 5;
			axis.renderer.grid.template.disabled = true;
			axis.renderer.labels.template.radius = am4core.percent(15);
			axis.renderer.labels.template.fontSize = "0.9em";

			const axis2 = chart.xAxes.push(new this.am4charts.ValueAxis());
			axis2.min = chartMin;
			axis2.max = chartMax;
			axis2.strictMinMax = true;
			axis2.renderer.labels.template.disabled = true;
			axis2.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
			axis2.renderer.grid.template.strokeOpacity = 0.3;

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
			  var range = axis2.axisRanges.create();
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

			const label = chart.radarContainer.createChild(am4core.Label);
			label.isMeasured = false;
			label.fontSize = "6em";
			label.x = am4core.percent(50);
			label.paddingBottom = 15;
			label.horizontalCenter = "middle";
			label.verticalCenter = "bottom";
			//label.dataItem = data;
			label.text = data.score.toFixed(1);
			label.text = `${this.threatLevel.score}`;
			label.fill = am4core.color('#ff0000');

			const label2 = chart.radarContainer.createChild(am4core.Label);
			label2.isMeasured = false;
			label2.fontSize = "2em";
			label2.horizontalCenter = "middle";
			label2.verticalCenter = "bottom";
			label2.text = this.threatLevel.label.toUpperCase();
			label2.fill = am4core.color('#ff0000');

			const hand = chart.hands.push(new am4charts.ClockHand());
			hand.axis = axis2;
			hand.innerRadius = am4core.percent(55);
			hand.startWidth = 8;
			hand.pin.disabled = true;
			hand.value = this.threatLevel.score;
			hand.fill = am4core.color("#444");
			hand.stroke = am4core.color("#000");



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
