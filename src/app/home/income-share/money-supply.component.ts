import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';

import { m1Config } from './m1';

@Component({
  selector: 'app-money-supply',
  templateUrl: './money-supply.component.html',
  styleUrls: ['./money-supply.component.sass']
})
export class MoneySupplyComponent implements AfterViewInit, OnDestroy {

  incomeGrowthChart: Chart;
  canvasElement: HTMLElement;

  constructor() { }

  ngAfterViewInit() {
    this.canvasElement = document.getElementById('moneySupplyCanvas');
    this.incomeGrowthChart = new Chart(this.canvasElement, m1Config);
  }

  ngOnDestroy() {
    if (this.incomeGrowthChart) this.incomeGrowthChart.destroy();
  }

}
