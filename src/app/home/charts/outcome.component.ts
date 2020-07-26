import { Component, NgZone, Input, AfterViewInit, OnDestroy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { PieChart } from './../../util/pie.chart';

@Component({
  selector: 'app-outcome',
  template: `
  	<div [id]="chartId" class="donut-chart"></div>
  `
})
export class OutcomeComponent extends PieChart implements OnChanges, AfterViewInit, OnDestroy {
  private label: any;
  public dataFields: {value: any, category: string} = {value: 'count', category: 'Outcome1'};
  @Input() chartId: string;
  @Input() data: any[] = [];
  @Input() fatalPercentage: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleViewPortChange();
  }

  constructor(private zone: NgZone) {
    super();
    this.colorSet = [
      '#E92036',
      '#6C6C6C',
      '#0CA65C'
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data.firstChange && changes.data.currentValue) {
      this.chart.data = changes.data.currentValue.data;
      this.label.text = `${changes.fatalPercentage.currentValue}%`;
    }
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.createChart();
      this.chart.innerRadius = this.am4core.percent(55);

      const label = this.pieSeries.createChild(this.am4core.Label);
      label.text = `${this.fatalPercentage}%`;
      label.horizontalCenter = "middle";
      label.verticalCenter = "bottom";
      label.fontSize = "30px";
      label.fill = this.am4core.color('#E92036');
      this.label = label;

      const label2 = this.pieSeries.createChild(this.am4core.Label);
      label2.horizontalCenter = "middle";
      label2.verticalCenter = "top";
      label2.marginTop = 100;
      label2.fontSize = "20px";
      label2.text = "Fatal";
      label2.fill = this.am4core.color('#E92036');
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
