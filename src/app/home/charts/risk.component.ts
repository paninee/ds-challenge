import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-risk',
  template: `
  	<div [id]="chartId" class="gauge-chart"></div>
  `,
})
export class RiskComponent implements AfterViewInit, OnDestroy {
	@Input() chartId: string;
	@Input() threatLevel: {label: string, score: number} = {label: 'n/a', score: 0};
	private chart: am4charts.GaugeChart;
	private radarContainerLabel: any;
	public am4charts: any;
	private hand: any;

	@HostListener('window:resize', ['$event'])
  onResize(event) {
    this.responsiveHandler();
  }

  constructor(private zone: NgZone) {
  	this.am4charts = am4charts;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.threatLevel.firstChange && changes.threatLevel.currentValue) {
      this.hand.value = changes.threatLevel.currentValue.score;
      this.hand.showValue(changes.threatLevel.currentValue.score, 1000, am4core.ease.cubicOut);
    }
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
			const axis = chart.xAxes.push(new this.am4charts.ValueAxis());
			axis.min = chartMin;
			axis.max = chartMax;
			axis.strictMinMax = true;
			axis.renderer.labels.template.disabled = true;
			axis.renderer.grid.template.disabled = true;

			const data = {
			  score: this.threatLevel.score,
			  gradingData: [
			    {
			      color: "#0CA65C",
			      lowScore: 0,
			      highScore: 25
			    },
			    {
			      color: "#F5D152",
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
			  range.label.fontSize = "15px";
			}

			const matchingGrade = this.lookUpGrade(data.score, data.gradingData);

			const label = chart.radarContainer.createChild(am4core.Label);
			label.isMeasured = false;
			label.fontSize = "15px";
			label.horizontalCenter = "middle";
			label.verticalCenter = "bottom";
			label.text = `${this.threatLevel.label.toUpperCase()} RISK`;
			label.fill = am4core.color(matchingGrade.color);
			this.radarContainerLabel = label;

			const hand = chart.hands.push(new am4charts.ClockHand());
			hand.axis = axis;
			hand.innerRadius = am4core.percent(25);
			hand.startWidth = 12;
			hand.pin.disabled = true;
			hand.value = this.threatLevel.score;
			hand.fill = am4core.color("#444");
			hand.stroke = am4core.color("#444");

			this.hand = hand;
      this.chart = chart;
    });
  }

  lookUpGrade(lookupScore, grades) {
	  // Only change code below this line
	  for (var i = 0; i < grades.length; i++) {
	    if (
	      grades[i].lowScore < lookupScore &&
	      grades[i].highScore >= lookupScore
	    ) {
	      return grades[i];
	    }
	  }
	  return null;
	}

	responsiveHandler(): void {
		this.radarContainerLabel.fontSize = "15px";
    if (document.body.clientWidth <= 930 ) {
      // this.radarContainerLabel.fontSize = "1rem";
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
