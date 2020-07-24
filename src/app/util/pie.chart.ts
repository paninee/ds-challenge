import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export class PieChartParentClass {
	private am4Charts: any;
	public chart: am4charts.PieChart;
	public chartId: string;
	public data: any[] = [];
	public dataFields: {value: any, category: string};

	constructor() {
		this.am4Charts = am4charts;
	}

	createChart(): void {
		let chart = am4core.create(this.chartId, am4charts.PieChart);

		// Add data
		chart.data = this.data;

		// Add and configure Series
		var pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = this.dataFields.value;
		pieSeries.dataFields.category = this.dataFields.category;

		pieSeries.ticks.template.disabled = true;
		pieSeries.alignLabels = false;
		pieSeries.labels.template.text = "[bold]{category}\n{value.percent.formatNumber('#.0')}%[/]";
		pieSeries.labels.template.radius = am4core.percent(-40);
    pieSeries.labels.template.fontSize = '20px';
		pieSeries.labels.template.fill = am4core.color("white");

		this.chart = chart;
	}
}