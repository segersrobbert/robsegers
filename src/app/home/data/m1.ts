// http://gabriel-zucman.eu/usdina/

const m1_dataset = [
  {
    label: 'M1 - global',
    fill: false,
    backgroundColor: 'lightblue',
    borderColor: 'blue',
    borderWidth: 1,
    // tslint:disable-next-line: max-line-length
    data: [3.395601, 3.73361, 4.121672, 4.685862, 5.232175, 6.1049, 6.922262, 8.266642, 9.520056, 10.34204, 11.42307, 12.80109, 14.8792, 16.69326, 18.29829, 19.3421, 21.01401, 23.05452, 24.92221, 27.16264, 29.56395, 32.16301, 36.0117, 39.1287, 42.40999, 44.99123, 47.43692, 49.04353, 51.7686, 57.39664, 61.6074, 68.52811, 75.49336, 82.56696, 90.77898, 100, 109.5958, 120.0868]
  },
  {
    label: 'M1 - EU',
    fill: false,
    backgroundColor: 'orange',
    borderColor: 'red',
    borderWidth: 1,
    // tslint:disable-next-line: max-line-length
    data: [0.2544863, 0.3049774, 0.3557654, 0.4432716, 0.5190786, 0.7076093, 0.8909675, 1.181189, 1.445642, 1.816852, 2.267499, 2.581445, 2.977962, 3.654597, 4.476007, 5.59513, 6.99728, 9.265371, 11.4489, 13.72997, 17.02598, 19.99312, 22.84744, 26.43581, 30.9484, 35.48572, 41.42315, 46.009, 51.45536, 55.60787, 61.49865, 66.36971, 69.85365, 78.26318, 87.15174, 100, 113.1199, 127.498]
  },
  {
    label: 'M1 - USA',
    fill: false,
    backgroundColor: 'pink',
    borderColor: 'purple',
    borderWidth: 1,
    // tslint:disable-next-line: max-line-length
    data: [6.919212, 7.3836, 7.909759, 8.481695, 8.906372, 9.309541, 9.834597, 10.5855, 11.45471, 12.32861, 13.09386, 14.0629, 14.98974, 16.65067, 17.8246, 19.42321, 22.04766, 24.60566, 25.63812, 25.88272, 26.82308, 28.42527, 31.96196, 35.68588, 37.89724, 37.82416, 36.62651, 35.41591, 35.75951, 36.47705, 36.52365, 37.73261, 39.60036, 42.16111, 44.49463, 45.40714, 45.50614, 45.43637, 47.47703, 54.20872, 57.66571, 66.52851, 76.62343, 84.37545, 93.15883, 100, 107.5121, 116.6308]
  }

];

const m1Data = {
  labels: [
  // tslint:disable-next-line: max-line-length
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
  datasets: m1_dataset
};

const m1Options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: { position: 'top' },
  title: {
    display: true,
    text: 'M1 - global'
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
};

const m1Config =       {
  type: 'line',
  data: m1Data,
  options: m1Options
};

export { m1Config };

// https://data.oecd.org/money/narrow-money-m1.htm#indicator-chart