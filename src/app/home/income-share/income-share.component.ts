import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as Chart from 'chart.js';

import { incomeShareConfig } from './incomeShareData';

@Component({
  selector: 'app-income-share',
  templateUrl: './income-share.component.html',
  styleUrls: ['./income-share.component.sass']
})
export class IncomeShareComponent implements AfterViewInit, OnDestroy {

  incomeShareChart: Chart;
  canvasElement: HTMLElement;

  constructor() { }

  ngAfterViewInit() {
    this.canvasElement = document.getElementById('incomeShareCanvas');
    this.incomeShareChart = new Chart(this.canvasElement, incomeShareConfig);
  }

  ngOnDestroy() {
    if (this.incomeShareChart) this.incomeShareChart.destroy();
  }

}
