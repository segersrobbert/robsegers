

// const data = await d3.csv('../../../data/FED_funds_rate.csv')
// this.FED_FUNDS_RATE_DATA = data.map(entry => {
//   return {
//     date: new Date(entry.date),
//     value: +entry.value
//   } as any;
// });

// this.lineFEDFundsRate = this.svg
//   .append('path')
//   .datum(this.FED_FUNDS_RATE_DATA)
//   .attr('transform', `translate(${pointSize}, ${pointSize})`)
//   .attr('clip-path', 'url(#clip)')
//   .attr('fill', 'none')
//   .attr('stroke', 'teal')
//   .attr('stroke-width', 1)
//   .attr('d', d3.line()
//     .x(xDateAccessor)
//     .y(yPercentageInterestAccessor)
//   );


// calculates simple moving average over 50 days
// this.movingAverageData = this.movingAverage(this.FED_FUNDS_RATE_DATA, 49);

// this.lineFEDFundsRateAverage = this.svg
//   .append('path')
//   .datum(this.movingAverageData)
//   .attr('transform', `translate(${pointSize}, ${pointSize})`)
//   .attr('clip-path', 'url(#clip)')
//   .attr('fill', 'none')
//   .attr('stroke', 'red')
//   .attr('stroke-width', 1)
//   .attr('d', d3.line()
//     .x(xDateAccessor)
//     .y(yPercentageInterestAccessor)
//   );

// createYAxis:
// this.yScaleStocks = d3.scaleLinear()
//   .domain([0, 3000])
//   .range([height, 0]);
// this.yAxisStocks = d3.axisRight(this.yScaleStocks);
// this.yAxisStocksLine = this.svg.append('g')
//   .attr('transform', `translate(${rightAxis + margin.left}, ${margin.top})`)
//   .attr('class', 'axis-right')
//   .style('color', axisRightColor)
//   .call(this.yAxisStocks);

// this.yScalePercentageInterest = d3.scaleLinear()
//   .domain([0, 20])
//   .range([height, 0]);
// this.yAxisPercentageInterest = d3.axisLeft(this.yScalePercentageInterest);
// this.yAxisInterestLine = this.svg.append('g')
//   .attr('transform', `translate(${margin.left + 25}, ${margin.top})`)
//   .attr('stroke', axisLeftColor)
//   .attr('stroke-width', 1)
//   .call(this.yAxisPercentageInterest);


// movingAverage(data: DateValue[], numberOfPricePoints: number): any[] {
//   return data.map((row, index, total) => {
//     const start = Math.max(0, index - numberOfPricePoints);
//     const end = index;
//     const subset = total.slice(start, end + 1);
//     const sum = subset.reduce((a, b) => a + b['value'], 0);
//     return {
//       date: row['date'],
//       value: sum / subset.length
//     };
//   });
// }
// movingAverage(values: DateValue[], N: number) {
//   let i = 0;
//   let sum = 0;
//   const means = [];
//   for (const n = Math.min(N - 1, values.length); i < n; i++) {
//     sum += values[i].value;
//   }
//   for (const n = values.length; i < n; i++) {
//     sum += values[i].value;
//     means.push({ date: values[i].date, value: sum / N });
//     sum -= values[i - N + 1].value;
//   }
//   return means;
// }

// this.yAxisInterestLine.call(this.yAxisPercentageInterest.scale(this.newYScalePercentageInterest));

// this.lineInterestRates.datum(OECDinterestRatesData)
//   .attr('d', d3.line()
//     .x((d: any) => this.newXScale(d.date))
//     .y((d: any) => this.newYScalePercentageInterest(d.value))
//   );
// this.lineFEDFundsRateAverage.datum(this.movingAverageData)
// .attr('d', d3.line()
//   .x((d: any) => this.newXScale(d.date))
//   .y((d: any) => this.newYScalePercentageInterest(d.value))
// );
// this.lineFEDFundsRate.datum(this.FED_FUNDS_RATE_DATA)
//   .attr('d', d3.line()
//     .x((d: any) => this.newXScale(d.date))
//     .y((d: any) => this.newYScalePercentageInterest(d.value))
//   );