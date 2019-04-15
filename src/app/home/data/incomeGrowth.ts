// http://gabriel-zucman.eu/usdina/

const dataSet_1946_1980 = [
  // {
  //   label: 'Pretax income growth (1946–1980)',
  //   backgroundColor: 'lightgreen',
  //   borderColor: 'green',
  //   borderWidth: 1,
  //   data: [109, 101, 105, 79, 47, 54, 76, 57]
  // },
  {
    label: 'Posttax income growth (1946–1980)',
    backgroundColor: 'lightblue',
    borderColor: 'blue',
    borderWidth: 1,
    data: [179, 117, 98, 69, 58, 104, 201, 163]
  }
];
const dataSet_1980_2014 = [
  // {
  //   label: 'Pretax income growth (1980–2014)',
  //   backgroundColor: 'lightgreen',
  //   borderColor: 'green',
  //   borderWidth: 1,
  //   data: [-25, 7, 42, 121, 204, 320, 453, 636]
  // },
  {
    label: 'Income growth (posttax, 1980–2014)',
    backgroundColor: 'lightblue',
    borderColor: 'blue',
    borderWidth: 1,
    data: [4, 26, 49, 113, 194, 298, 423, 616]
  }
];

const incomeGrowthData = {
  labels: ['p0 - p20', 'p20 - p50', 'p50 - p90', 'p90 - p100', 'top 1%', 'top 0.1%', 'top 0.01%', 'top 0.001%'],
  datasets: dataSet_1980_2014
};

const chartOptions = {
  responsive: true,
  legend: { position: 'top' },
  title: {
    display: true,
    text: 'Income growth in the United States post WWII'
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

export {
  dataSet_1946_1980,
  dataSet_1980_2014,
  incomeGrowthData,
  chartOptions
};
