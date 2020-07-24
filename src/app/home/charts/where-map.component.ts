import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
// import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-where-map',
  template: `
    <div [id]="chartId" class="gauge-chart"></div>
  `
})
export class WhereMapComponent implements AfterViewInit, OnDestroy {
  @Input() chartId: string;
  @Input() threatLevel: {label: string, score: number} = {label: 'n/a', score: 0};
  private chart: am4charts.GaugeChart;
  private radarContainerLabel: any;
  public am4charts: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.responsiveHandler();
  }

  constructor(private zone: NgZone) {
    // this.am4charts = am4charts;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Create map instance
      let chart = am4core.create(this.chartId, am4maps.MapChart);
      this.chart = chart;
    });
  }

  responsiveHandler(): void {
    this.radarContainerLabel.fontSize = "2rem";
    if (document.body.clientWidth <= 930 ) {
      
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
