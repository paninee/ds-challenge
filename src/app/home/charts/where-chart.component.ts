import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-where-chart',
  template: `
   <div [id]="chartId" class="graph-chart"></div>
  `,
  styles: []
})
export class WhereChartComponent implements AfterViewInit, OnDestroy {
  @Input() chartId: string;
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

      chart.data = [{
        "country": "Lithuania",
        "litres": 501
      }, {
        "country": "Czechia",
        "litres": 301
      }, {
        "country": "Ireland",
        "litres": 201
      }, {
        "country": "Germany",
        "litres": 165
      }, {
        "country": "Australia",
        "litres": 139
      }, {
        "country": "Austria",
        "litres": 128
      }, {
        "country": "UK",
        "litres": 99
      }, {
        "country": "Belgium",
        "litres": 60
      }, {
        "country": "The Netherlands",
        "litres": 50
      }];

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.title.text = "Local country offices";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;


      const  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Expenditure (M)";

      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "research";
      series.dataFields.categoryX = "country";
      series.name = "Research";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.stacked = true;

      const series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "marketing";
      series2.dataFields.categoryX = "country";
      series2.name = "Marketing";
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.stacked = true;

      const series3 = chart.series.push(new am4charts.ColumnSeries());
      series3.dataFields.valueY = "sales";
      series3.dataFields.categoryX = "country";
      series3.name = "Sales";
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
