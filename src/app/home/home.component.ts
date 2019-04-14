import {
  Component,
  AfterViewInit
} from '@angular/core';
import Chart from 'chart.js';

import {
  dataSet_1946_1980,
  dataSet_1980_2014,
  barChartData as distEcoGrowthData,
  chartOptions as distEcoGrowthOptions
} from './data/incomeGrowth';
import { incomeShare } from './data/incomeShare';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  distEcoGrowthChart: Chart;
  incomeShareChart: Chart;

  constructor() { }

  ngAfterViewInit() {

    const ctx = document.getElementById('homeChart');
    this.distEcoGrowthChart = new Chart(ctx, {
      type: 'bar',
      data: distEcoGrowthData,
      options: distEcoGrowthOptions
    });
    this.incomeShareChart = new Chart(ctx, {
      type: 'line',
      data: incomeShare,
      options: distEcoGrowthOptions
    });
  }

  toggleEcoGrowthTime() {
    if (this.distEcoGrowthChart.data.datasets === dataSet_1980_2014) {
      this.distEcoGrowthChart.data.datasets = dataSet_1946_1980;
    } else {
      this.distEcoGrowthChart.data.datasets = dataSet_1980_2014;
    }
    this.distEcoGrowthChart.update();
  }
}
