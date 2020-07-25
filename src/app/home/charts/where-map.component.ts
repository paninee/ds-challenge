import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_canada_onLow from "@amcharts/amcharts4-geodata/region/canada/onLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-where-map',
  template: `
    <div [id]="chartId" class="map-chart"></div>
  `,
  styles: [`div {height: 500px}`]
})
export class WhereMapComponent implements AfterViewInit, OnDestroy {
  @Input() chartId: string;
  @Input() data: any[] = []
  private chart: am4maps.MapChart;
  private radarContainerLabel: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.responsiveHandler();
  }

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Create map instance
      let chart = am4core.create(this.chartId, am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_region_canada_onLow;

      // Set projection
      chart.projection = new am4maps.projections.Miller();

      // Create map polygon series
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.calculateVisualCenter = true;

      // Configure series
      let polygonTemplate = polygonSeries.mapPolygons.template;
      // polygonTemplate.tooltipText = "{CDNAME}";
      polygonTemplate.fill = chart.colors.getIndex(0);

      // Creates a series
      const createSeries = () => {
        let series = chart.series.push(new am4maps.MapImageSeries());
        series.dataFields.value = 'radius';

        let template = series.mapImages.template;
        template.verticalCenter = "middle";
        template.horizontalCenter = "middle";
        template.propertyFields.latitude = "lat";
        template.propertyFields.longitude = "long";
        template.tooltipText = "{name}:\n[bold]{count} cases[/]";

        let circle = template.createChild(am4core.Circle);
        circle.radius = 20;
        circle.fillOpacity = 0.7;
        circle.verticalCenter = "middle";
        circle.horizontalCenter = "middle";
        circle.nonScaling = true;

        let label = template.createChild(am4core.Label);
        label.text = "{count}";
        label.fill = am4core.color("#fff");
        label.verticalCenter = "middle";
        label.horizontalCenter = "middle";
        label.nonScaling = true;

        series.heatRules.push({
          target: circle,
          property: "radius",
          min: 10,
          max: 30
        });

        return series;
      }

      const setupStores = () => {
        const imageSeries = createSeries();
        var seriesData = [];
        
        am4core.array.each(this.data, (storeData: any) => {
          let store = {
            long: am4core.type.toNumber(storeData.Reporting_PHU_Longitude),
            lat: am4core.type.toNumber(storeData.Reporting_PHU_Latitude),
            count: am4core.type.toNumber(storeData.count),
            name: storeData.Reporting_PHU,
            radius: storeData.count.toFixed().length
          };
          seriesData.push(store);
        });

        imageSeries.data = seriesData;
      }

      // Load data when map polygons are ready
      chart.events.on("ready", setupStores);

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
