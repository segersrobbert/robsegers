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

  constructor() {
    console.log('home');
  }

  ngAfterViewInit() {
    const ctx = document.getElementById('homeChart');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989',
          '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
          '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
          '2010', '2011', '2012', '2013', '2014', '2015', '2016'
        ],
        datasets: [
          {
            label: 'top 1% pre-tax national income share',
            data: [
              0.1616, 0.1621, 0.1563, 0.1576, 0.1618, 0.1696, 0.1718, 0.1762, 0.1807, 0.1804,
              0.1813, 0.1798, 0.1834, 0.1862, 0.1877, 0.1916, 0.1963, 0.2000, 0.2039, 0.2057,
              0.2090, 0.2073, 0.2076, 0.2102, 0.2132, 0.2175, 0.2212, 0.2208, 0.2176, 0.2077,
              0.2079, 0.2090, 0.2066, 0.2055, 0.2051, 0.2056, 0.2044,
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'top 10% pre-tax national income share',
            data: [
              0.4898, 0.4888, 0.4815, 0.4893, 0.4916, 0.4971, 0.5008, 0.5043, 0.5078, 0.5108,
              0.5109, 0.5105, 0.5206, 0.5266, 0.5333, 0.5376, 0.5394, 0.5421, 0.5480, 0.5506,
              0.5532, 0.5526, 0.5529, 0.5544, 0.5545, 0.5536, 0.5530, 0.5464, 0.5449, 0.5351,
              0.5333, 0.5353, 0.5287, 0.5267, 0.5224, 0.5222, 0.5212,
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'bottom 50% pre-tax national income share',
            data: [
              0.0792, 0.0808, 0.0840, 0.0831, 0.0874, 0.0917, 0.0914, 0.0925, 0.0922, 0.0899,
              0.0878, 0.0895, 0.0901, 0.0893, 0.0889, 0.0882, 0.0887, 0.0891, 0.0895, 0.0892,
              0.0869, 0.0873, 0.0869, 0.0870, 0.0882, 0.0881, 0.0894, 0.0914, 0.0924, 0.0953,
              0.0948, 0.0943, 0.0950, 0.0953, 0.0963, 0.0966, 0.0967,
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
