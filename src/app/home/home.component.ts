import {
  Component,
  AfterViewInit
} from '@angular/core';

import Chart from 'chart.js';

import { incomeGrowthConfig } from './data/incomeGrowth';
import { incomeShareConfig } from './data/incomeShare';
import { m1Config } from './data/m1';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  mainChart: Chart;
  canvasElement: HTMLElement;

  constructor() { }

  ngAfterViewInit() {
    this.canvasElement = document.getElementById('homeChart');
    this.showIncomeGrowthGraph();
  }

  showIncomeGrowthGraph() {
    if (this.mainChart) this.mainChart.destroy();
    this.mainChart = new Chart(this.canvasElement, incomeGrowthConfig);
  }
  showIncomeShareGraph() {
    if (this.mainChart) this.mainChart.destroy();
    this.mainChart = new Chart(this.canvasElement, incomeShareConfig);
  }
  setM1Config() {
    if (this.mainChart) this.mainChart.destroy();
    this.mainChart = new Chart(this.canvasElement, m1Config);
  }

}
