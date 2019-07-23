const incomeShareData = [{
  label: 'Bottom 50%',
  backgroundColor: 'red',
  borderColor: 'red',
  // tslint:disable-next-line: max-line-length
  data: [19.5, 19.1, 18.7, 19.1, 19.6, 20.4, 20.7, 21.0, 20.8, 20.4, 20.2, 20.4, 20.5, 20.3, 20.2, 20.0, 20.0, 20.1, 19.9, 19.5, 19.0, 18.3, 17.9, 17.9, 17.7, 17.3, 16.9, 16.9, 16.8, 16.6, 15.8, 15.9, 15.8, 15.4, 15.1, 14.9, 14.9, 14.8, 14.6, 14.9, 14.8, 14.5, 14.2, 13.8, 13.5, 13.7, 13.7, 13.6, 13.0, 12.7, 12.4, 12.8, 12.5],
  fill: false,
}, {
//   label: 'Middle 40%',
//   fill: false,
//   backgroundColor: 'blue',
//   borderColor: 'blue',
//   // tslint:disable-next-line: max-line-length
//   data: [44.4, 44.4, 44.3, 44.2, 44.2, 44.0, 44.1, 44.7, 45.1, 45.2, 45.1, 45.0, 45.2, 45.4, 45.4, 45.3, 45.3, 45.0, 45.9, 45.8, 46.1, 46.3, 45.5, 45.5, 45.9, 45.1, 44.1, 44.4, 44.5, 44.8, 44.4, 44.5, 44.4, 44.0, 43.4, 42.9, 42.5, 41.9, 41.5, 42.3, 42.5, 42.6, 41.9, 41.1, 40.4, 40.5, 41.0, 42.1, 41.2, 41.3, 40.5, 40.9, 40.4]
// }, {
//   label: 'Top 10%',
//   fill: false,
//   backgroundColor: 'purple',
//   borderColor: 'purple',
//   // tslint:disable-next-line: max-line-length
//   data: [36.1, 36.5, 37.0, 36.6, 36.3, 35.6, 35.2, 34.3, 34.1, 34.4, 34.7, 34.7, 34.3, 34.4, 34.4, 34.6, 34.7, 34.9, 34.2, 34.7, 34.9, 35.4, 36.7, 36.7, 36.5, 37.6, 38.9, 38.7, 38.7, 38.6, 39.8, 39.6, 39.9, 40.7, 41.5, 42.3, 42.6, 43.3, 43.9, 42.8, 42.7, 42.9, 43.9, 45.1, 46.0, 45.8, 45.3, 44.3, 45.8, 45.9, 47.1, 46.3, 47.0]
// },
  label: 'Top 1%',
  fill: false,
  backgroundColor: 'green',
  borderColor: 'green',
  // tslint:disable-next-line: max-line-length
  data: [12.6, 12.7, 12.9, 12.8, 12.6, 12.3, 12.2, 11.5, 11.0, 11.1, 11.1, 10.9, 10.7, 10.6, 10.5, 10.7, 10.8, 11.2, 10.7, 11.0, 11.3, 11.5, 12.5, 12.6, 12.2, 13.3, 14.9, 14.5, 14.5, 13.9, 15.0, 14.6, 14.7, 15.3, 16.0, 16.6, 16.9, 17.7, 18.3, 17.3, 17.1, 17.2, 18.3, 19.4, 20.1, 19.9, 19.5, 18.5, 19.8, 19.6, 20.8, 19.6, 20.2]
}, {
  label: 'Top 0.1%',
  fill: false,
  backgroundColor: 'orange',
  borderColor: 'orange',
  // tslint:disable-next-line: max-line-length
  data: [4.4, 4.6, 4.7, 4.7, 4.6, 4.4, 4.4, 4.1, 3.7, 3.7, 3.7, 3.5, 3.4, 3.3, 3.3, 3.4, 3.5, 3.9, 3.6, 3.8, 4.1, 4.1, 4.7, 4.7, 4.3, 4.8, 6.0, 5.5, 5.5, 5.1, 5.8, 5.6, 5.6, 5.9, 6.4, 6.8, 6.9, 7.4, 7.9, 7.3, 7.1, 7.2, 8.0, 8.8, 9.1, 9.1, 8.9, 8.6, 9.5, 9.1, 9.9, 8.9, 9.3]
}, {
  label: 'Top 0.01%',
  fill: false,
  backgroundColor: 'purple',
  borderColor: 'purple',
  // tslint:disable-next-line: max-line-length
  data: [1.7, 1.8, 1.8, 1.8, 1.8, 1.7, 1.7, 1.6, 1.4, 1.4, 1.4, 1.2, 1.1, 1.1, 1.2, 1.2, 1.2, 1.5, 1.3, 1.4, 1.5, 1.5, 1.8, 1.6, 1.5, 1.7, 2.3, 2.0, 2.1, 1.9, 2.3, 2.3, 2.2, 2.3, 2.6, 2.7, 2.8, 3.1, 3.3, 3.0, 2.9, 3.1, 3.5, 3.9, 4.0, 4.1, 4.1, 4.2, 4.7, 4.2, 4.7, 4.2, 4.4]
},
// {
//   label: 'Top 0.001%',
//   fill: false,
//   backgroundColor: 'blue',
//   borderColor: 'blue',
//   // tslint:disable-next-line: max-line-length
//   data: [0.6, 0.7, 0.7, 0.7, 0.7, 0.6, 0.6, 0.6, 0.5, 0.5, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.6, 0.4, 0.5, 0.5, 0.5, 0.6, 0.2, 0.5, 0.6, 0.8, 0.7, 0.7, 0.7, 0.8, 0.8, 0.8, 0.8, 1.0, 1.0, 1.0, 1.1, 1.2, 1.2, 1.2, 1.2, 1.4, 1.5, 1.6, 1.7, 1.8, 2.0, 2.2, 1.8, 2.0, 1.8, 1.9]
// }
];

const incomeShareChart = {
  // tslint:disable-next-line: max-line-length
  labels: [1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
  datasets: incomeShareData
};

const incomeShareOptions = {
  responsive: true,
  maintainAspectRatio: false,
  title: { display: true, text: 'Income share' },
  tooltips: { mode: 'index', intersect: false },
  hover: { mode: 'nearest', intersect: true },
  scales: {
    xAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Year'
      }
    }],
    yAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Income share'
      }
    }]
  }
};

const incomeShareConfig = {
  type: 'line',
  data: {
    // tslint:disable-next-line: max-line-length
    labels: [1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
    datasets: incomeShareData
  },
  options: incomeShareOptions
};



export {
  incomeShareConfig,
  incomeShareData,
  incomeShareOptions,
  incomeShareChart,
};
