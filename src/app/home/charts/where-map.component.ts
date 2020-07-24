import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_canada_onLow from "@amcharts/amcharts4-geodata/region/canada/onLow";
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
  private chart: am4maps.MapChart;
  private radarContainerLabel: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.responsiveHandler();
  }

  constructor(private zone: NgZone) {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Create map instance
      let chart = am4core.create(this.chartId, am4maps.MapChart);
      let regionalSeries: any = {};
      let currentSeries;
      chart.maxZoomLevel = 64;

      // Set map definition
      chart.geodata = am4geodata_region_canada_onLow;

      // Set projection
      chart.projection = new am4maps.projections.Miller();

      // Add button
      // let zoomOut = chart.tooltipContainer.createChild(am4core.ZoomOutButton);
      // zoomOut.align = "right";
      // zoomOut.valign = "top";
      // zoomOut.margin(20, 20, 20, 20);
      // zoomOut.events.on("hit", () => {
      //   if (currentSeries) {
      //     currentSeries.hide();
      //   }
      //   chart.goHome();
      //   zoomOut.hide();
      //   currentSeries = regionalSeries.US.series;
      //   currentSeries.show();
      // });
      // zoomOut.hide();


      // Create map polygon series
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      polygonSeries.calculateVisualCenter = true;

      // Configure series
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = chart.colors.getIndex(0);

      // Loads store data
      // const loadStores = () => {
      //   let loader = new am4core.DataSource();
      //   loader.url = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-160/TargetStores.json";
      //   loader.events.on("parseended", function(ev) {
      //     setupStores(ev.target.data);
      //   });
      //   loader.load();
      // }

      // Load data when map polygons are ready
      // chart.events.on("ready", loadStores);

      // Creates a series
      const createSeries = (heatfield) => {
        let series = chart.series.push(new am4maps.MapImageSeries());
        series.dataFields.value = heatfield;

        let template = series.mapImages.template;
        template.verticalCenter = "middle";
        template.horizontalCenter = "middle";
        template.propertyFields.latitude = "lat";
        template.propertyFields.longitude = "long";
        template.tooltipText = "{name}:\n[bold]{stores} stores[/]";

        let circle = template.createChild(am4core.Circle);
        circle.radius = 10;
        circle.fillOpacity = 0.7;
        circle.verticalCenter = "middle";
        circle.horizontalCenter = "middle";
        circle.nonScaling = true;

        let label = template.createChild(am4core.Label);
        label.text = "{stores}";
        label.fill = am4core.color("#fff");
        label.verticalCenter = "middle";
        label.horizontalCenter = "middle";
        label.nonScaling = true;

        let heat = series.heatRules.push({
          target: circle,
          property: "radius",
          min: 10,
          max: 30
        });

        // Set up drill-down
        series.mapImages.template.events.on("hit", function(ev) {

          // Determine what we've clicked on
          let data: any = ev.target.dataItem.dataContext;

          // No id? Individual store - nothing to drill down to further
          if (!data.target) {
            return;
          }

          // Create actual series if it hasn't been yet created
          if (!regionalSeries[data.target].series) {
            regionalSeries[data.target].series = createSeries("count");
            regionalSeries[data.target].series.data = data.markerData;
          }

          // Hide current series
          if (currentSeries) {
            currentSeries.hide();
          }

          // Control zoom
          if (data.type == "state") {
            let statePolygon = polygonSeries.getPolygonById("US-" + data.state);
            chart.zoomToMapObject(statePolygon);
          }
          else if (data.type == "city") {
            chart.zoomToGeoPoint({
              latitude: data.lat,
              longitude: data.long
            }, 64, true);
          }
          zoomOut.show();

          // Show new targert series
          currentSeries = regionalSeries[data.target].series;
          currentSeries.show();
        });

        return series;
      }

      const setupStores = (data) => {
        // Init country-level series
        regionalSeries.US = {
          markerData: [],
          series: createSeries("stores")
        };

        // Set current series
        currentSeries = regionalSeries.US.series;

        // Process data
        am4core.array.each(data.query_results, (storeData: any) => {

          // Get store data
          let store = {
            state: storeData.MAIL_ST_PROV_C,
            long: am4core.type.toNumber(storeData.LNGTD_I),
            lat: am4core.type.toNumber(storeData.LATTD_I),
            location: storeData.co_loc_n,
            city: storeData.mail_city_n,
            count: am4core.type.toNumber(storeData.count)
          };

          // Process state-level data
          if (regionalSeries[store.state] == undefined) {
            let statePolygon: any = polygonSeries.getPolygonById("US-" + store.state);
            if (statePolygon) {

              // Add state data
              regionalSeries[store.state] = {
                target: store.state,
                type: "state",
                name: statePolygon.dataItem.dataContext.name,
                count: store.count,
                stores: 1,
                lat: statePolygon.visualLatitude,
                long: statePolygon.visualLongitude,
                state: store.state,
                markerData: []
              };
              regionalSeries.US.markerData.push(regionalSeries[store.state]);

            }
            else {
              // State not found
              return;
            }
          }
          else {
            regionalSeries[store.state].stores++;
            regionalSeries[store.state].count += store.count;
          }

          // Process city-level data
          if (regionalSeries[store.city] == undefined) {
            regionalSeries[store.city] = {
              target: store.city,
              type: "city",
              name: store.city,
              count: store.count,
              stores: 1,
              lat: store.lat,
              long: store.long,
              state: store.state,
              markerData: []
            };
            regionalSeries[store.state].markerData.push(regionalSeries[store.city]);
          }
          else {
            regionalSeries[store.city].stores++;
            regionalSeries[store.city].count += store.count;
          }

          // Process individual store
          regionalSeries[store.city].markerData.push({
            name: store.location,
            count: store.count,
            stores: 1,
            lat: store.lat,
            long: store.long,
            state: store.state
          });

        });

        regionalSeries.US.series.data = regionalSeries.US.markerData;
      }

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
