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
		pieSeries.slices.template.stroke = am4core.color("#fff");
		pieSeries.slices.template.strokeOpacity = 1;

		let colorSet = [];
		this.data.forEach(x => {
			// Ex: #fff
			colorSet.push(x.color);
		});
		pieSeries.colors.list = colorSet;

		// This creates initial animation
		pieSeries.hiddenState.properties.opacity = 1;
		pieSeries.hiddenState.properties.endAngle = -90;
		pieSeries.hiddenState.properties.startAngle = -90;

		chart.hiddenState.properties.radius = am4core.percent(0);

		this.chart = chart;
	}
}