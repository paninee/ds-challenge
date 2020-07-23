import { Component, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-pie',
  template: `
  	<div id="pie-chart" style="width: 100%; height: 500px"></div>
  `
})
export class PieComponent implements AfterViewInit, OnDestroy {
	private chart: am4charts.GaugeChart;
	public am4charts: any;

  constructor(private zone: NgZone) {
  	this.am4charts = am4charts;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("pie-chart", am4charts.GaugeChart);
      chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
      chart.innerRadius = -25;

      var axis = chart.xAxes.push(new this.am4charts.ValueAxis());
			axis.min = 0;
			axis.max = 100;
			axis.strictMinMax = true;
			axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
			axis.renderer.grid.template.strokeOpacity = 0.3;

			var colorSet = new am4core.ColorSet();

			var range0 = axis.axisRanges.create();
			range0.value = 0;
			range0.endValue = 50;
			range0.axisFill.fillOpacity = 1;
			range0.axisFill.fill = colorSet.getIndex(0);
			range0.axisFill.zIndex = - 1;

			var range1 = axis.axisRanges.create();
			range1.value = 50;
			range1.endValue = 80;
			range1.axisFill.fillOpacity = 1;
			range1.axisFill.fill = colorSet.getIndex(2);
			range1.axisFill.zIndex = -1;

			var range2 = axis.axisRanges.create();
			range2.value = 80;
			range2.endValue = 100;
			range2.axisFill.fillOpacity = 1;
			range2.axisFill.fill = colorSet.getIndex(4);
			range2.axisFill.zIndex = -1;

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