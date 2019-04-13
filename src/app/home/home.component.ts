import {
  Component,
  AfterViewInit
} from '@angular/core';

import Chart from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {

    const barChartData = {
      labels: [
        "p0 - p20",
        "p20 - p50",
        "p50 - p90",
        "p90 - p100",
        "top 1%",
        "top 0.1%",
        "top 0.01%",
        "top 0.001%"
      ],
      datasets: [
        {
          label: "Pretax income growth (1946–1980)",
          backgroundColor: "orange",
          borderColor: "red",
          borderWidth: 1,
          data: [109, 101, 105, 79, 47, 54, 76, 57]
        },
        {
          label: "Pretax income growth (1980–2014)",
          backgroundColor: "lightgreen",
          borderColor: "green",
          borderWidth: 1,
          data: [-25, 7, 42, 121, 204, 320, 453, 636]
        },
        {
          label: "Posttax income growth (1946–1980)",
          backgroundColor: "pink",
          borderColor: "purple",
          borderWidth: 1,
          data: [179, 117, 98, 69, 58, 104, 201, 163]
        },
        {
          label: "Posttax income growth (1980–2014)",
          backgroundColor: "lightblue",
          borderColor: "blue",
          borderWidth: 1,
          data: [4, 26, 49, 113, 194, 298, 423, 616]
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "The Distribution of Economic Growth in the United States post WWII"
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    const ctx = document.getElementById('homeChart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: chartOptions
    });
  }

}
