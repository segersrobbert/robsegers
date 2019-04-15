import {
  Component,
  AfterViewInit
} from '@angular/core';
import Chart from 'chart.js';

import {
  dataSet_1946_1980,
  dataSet_1980_2014,
  incomeGrowthData,
  chartOptions as incomeGrowthOptions
} from './data/incomeGrowth';
import { incomeShareData, incomeShareOptions, config } from './data/incomeShare';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  incomeGrowthChart: Chart;
  incomeShareChart: Chart;

  constructor() { }

  ngAfterViewInit() {

    const ctx = document.getElementById('homeChart');
    this.incomeGrowthChart = new Chart(
      ctx,
      // {
      //   type: 'bar',
      //   data: incomeGrowthData,
      //   options: incomeGrowthOptions
      // },
      config
      // {
      //   type: 'line',
      //   data: incomeShareData,
      //   options: incomeShareOptions
      // }
    );
    // this.incomeShareChart = new Chart(ctx, {
    //   type: 'line',
    //   data: incomeShareData,
    //   options: distEcoGrowthOptions
    // });
  }

  toggleEcoGrowthTime() {
    if (this.incomeGrowthChart.data.datasets === dataSet_1980_2014) {
      this.incomeGrowthChart.data.datasets = dataSet_1946_1980;
    } else {
      this.incomeGrowthChart.data.datasets = dataSet_1980_2014;
    }
    this.incomeGrowthChart.update();
  }
}
