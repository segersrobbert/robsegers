import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';
import { growthDistributionConfig } from './incomeGrowth';

@Component({
  selector: 'app-growth-distribution',
  templateUrl: './growth-distribution.component.html',
  styleUrls: ['./growth-distribution.component.sass']
})
export class GrowthDistributionComponent implements AfterViewInit, OnDestroy {

  growthDistributionChart: Chart;
  canvasElement: HTMLElement;

  constructor() { }

  ngAfterViewInit() {
    this.canvasElement = document.getElementById('growthDistributionCanvas');
    this.growthDistributionChart = new Chart(this.canvasElement, growthDistributionConfig);
  }

  ngOnDestroy() {
    if (this.growthDistributionChart) this.growthDistributionChart.destroy();
  }

}
