import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export class PieChart {
	private am4Charts: any;
	public chart: am4charts.PieChart;
	public chartId: string;
	public data: any[] = [];
	public dataFields: {value: any, category: string};
	public colorSet: any[] = [];

	constructor() {
		this.am4Charts = am4charts;
	}

	createChart(): void {
		const chart = am4core.create(this.chartId, am4charts.PieChart);

		// Add data
		chart.data = this.data;

		// Add legend
		// chart.legend = new am4charts.Legend();
		// chart.legend.position = "bottom";
		// chart.legend.valueLabels.template.align = "left";
		// chart.legend.valueLabels.template.textAlign = "end"; 
		// chart.legend.itemContainers.template.paddingTop = 5;
		// chart.legend.itemContainers.template.paddingBottom = 5;

		// Add and configure Series
		const pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = this.dataFields.value;
		pieSeries.dataFields.category = this.dataFields.category;
		pieSeries.slices.template.stroke = am4core.color("#fff");
		pieSeries.slices.template.strokeOpacity = 1;
		pieSeries.labels.template.maxWidth = 130;
    pieSeries.labels.template.wrap = true;

		// Generate color set
		pieSeries.colors.list = this.generateColorSet();

		// This creates initial animation
		pieSeries.hiddenState.properties.opacity = 1;
		pieSeries.hiddenState.properties.endAngle = -90;
		pieSeries.hiddenState.properties.startAngle = -90;
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
    	if (!this.chart.legend) {
	   		this.chart.legend = new am4charts.Legend();
				this.chart.legend.position = "bottom";
				this.chart.legend.valueLabels.template.align = "left";
				this.chart.legend.valueLabels.template.textAlign = "end"; 
				this.chart.legend.itemContainers.template.paddingTop = 5;
				this.chart.legend.itemContainers.template.paddingBottom = 5;
			}
    } else {
    	if (this.chart.legend) {
    		this.chart.legend.dispose();
    	}
    }
  }
}