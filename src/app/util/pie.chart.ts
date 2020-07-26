import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export class PieChart {
	private am4Charts: any;
	private pieSeries: any;
	public chart: am4charts.PieChart;
	public chartId: string;
	public colorSet: any[] = [];
	public data: any[] = [];
	public dataFields: {value: any, category: string};

	constructor() {
		this.am4Charts = am4charts;
	}

	createChart(): void {
		const chart = am4core.create(this.chartId, am4charts.PieChart);

		// Add data
		chart.data = this.data;

		// Add and configure Series
		this.pieSeries = chart.series.push(new am4charts.PieSeries());
		this.pieSeries.dataFields.value = this.dataFields.value;
		this.pieSeries.dataFields.category = this.dataFields.category;
		this.pieSeries.slices.template.stroke = am4core.color("#fff");
		this.pieSeries.slices.template.strokeWidth = 1;
		this.pieSeries.slices.template.strokeOpacity = 1;
		this.pieSeries.labels.template.maxWidth = undefined;
    this.pieSeries.labels.template.wrap = true;

		// Generate color set
		this.pieSeries.colors.list = this.generateColorSet();

		// This creates initial animation
		this.pieSeries.hiddenState.properties.opacity = 1;
		this.pieSeries.hiddenState.properties.endAngle = -90;
		this.pieSeries.hiddenState.properties.startAngle = -90;
		chart.hiddenState.properties.radius = am4core.percent(0);

		this.chart = chart;
		this.handleViewPortChange();
	}

	generateColorSet(): any[] {
		const colorSet = this.colorSet.map(color => {
			return am4core.color(color);
		});
		return colorSet;
	}

	handleViewPortChange(): void {
    if (document.body.clientWidth <= 930 ) {
    	this.createLegend();
    } else {
    	this.removeLegend();
    }
  }

  createLegend(): void {
  	this.pieSeries.ticks.template.disabled = true;
  	this.pieSeries.labels.template.text = '';
  	if (!this.chart.legend) {
   		this.chart.legend = new am4charts.Legend();
			this.chart.legend.position = "bottom";
			this.chart.legend.valueLabels.template.align = "right";
			this.chart.legend.valueLabels.template.textAlign = "end";
			this.chart.legend.itemContainers.template.paddingTop = 5;
			this.chart.legend.itemContainers.template.paddingBottom = 5;
		}
  }

  removeLegend(): void {
  	this.pieSeries.ticks.template.disabled = false;
  	this.pieSeries.labels.template.text = `{category}: {value.percent.formatNumber('#.0')}%`;
  	if (this.chart.legend) {
  		this.chart.legend.dispose();
  	}
  }
}
