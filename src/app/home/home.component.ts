import {
  Component,
  AfterViewInit
} from '@angular/core';

import Chart from 'chart.js';

import { incomeGrowthConfig } from './data/incomeGrowth';
import { incomeShareConfig } from './data/incomeShare';

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
    this.mainChart = new Chart(this.canvasElement, incomeGrowthConfig);
  }
  showIncomeShareGraph() {
    this.mainChart = new Chart(this.canvasElement, incomeShareConfig);
  }

}
