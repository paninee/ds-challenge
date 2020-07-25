import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-when',
  template: `
   <div [id]="chartId" class="graph-chart"></div>
  `,
  styles: []
})
export class WhenComponent implements AfterViewInit, OnDestroy {
  @Input() chartId: string;
  @Input() data: any[] = [];
  private chart: am4charts.XYChart;
  public am4charts: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.responsiveHandler();
  }

  constructor(private zone: NgZone) {
    this.am4charts = am4charts;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create(this.chartId, am4charts.XYChart);
      chart.data = this.data;

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "date";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.zoom({start: .5, end: .55}, true);

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Cases";

      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "Resolved";
      series.dataFields.categoryX = "date";
      series.name = "Resolved";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.stacked = true;

      const series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "Not Resolved";
      series2.dataFields.categoryX = "date";
      series2.name = "Not Resolved";
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.stacked = true;

      const series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.dataFields.valueY = "Fatal";
      series3.dataFields.categoryX = "date";
      series3.name = "Fatal";
      series3.tooltipText = "{name}: [bold]{valueY}[/]";
      series3.stacked = true;

      // Add cursor
      chart.cursor = new am4charts.XYCursor();

      this.chart = chart;
    });
  }

  responsiveHandler(): void {
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
