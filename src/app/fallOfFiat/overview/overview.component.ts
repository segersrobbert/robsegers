import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as d3 from 'd3';

import { OECDinterestRatesData } from '../../../data/OECD_interest_rates';
import { M3_OECD_DATA } from '../../../data/M3_OECD';
import { SP500_DATA } from '../../../data/sp500';
import { LineGeneratorService } from '../services/line-generator.service';

export interface DateValue {
  date: Date;
  value: number;
}

// dimensions and margins
const width = window.innerWidth;
const height = 0.65 * window.innerHeight;
const svgWidth = 0.85 * width;
const margin = {
  top: (0.05 * height),
  right: (0.05 * width),
  bottom: (0.05 * height),
  left: Math.max((0.05 * width), 30)
};
const pointSize = 10;
const axisRightColor = 'steelblue';
const axisLeftColor = 'darkred';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass']
})
export class OverviewComponent implements OnInit {
  // https://bl.ocks.org/mbostock/4015254
  // https://bl.ocks.org/mbostock/431a331294d2b5ddd33f947cf4c81319
  // https://medium.com/netscape/visualizing-data-with-angular-and-d3-209dde784aeb

  // Sources:
  // M3 money supply: data.oecd.org/money/broad-money-m3.htm
  // SP500 stocks: https://finance.yahoo.com/quote/%5EGSPC/history
  // OECD interest rates: https://data.oecd.org/interest/long-term-interest-rates.htm#indicator-chart
  // FED funds rate: https://www.macrotrends.net/2015/fed-funds-rate-historical-chart
    // ATTRIBUTION: Proper attribution requires clear indication of the data source as "www.macrotrends.net".
    // A "dofollow" backlink to the originating page is also required if the data is displayed on a web page.

  FED_FUNDS_RATE_DATA: any;

  zoomed$: Subject<void> = new Subject();
  zoom: d3.ZoomBehavior<Element, unknown>;
  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

  xScale: d3.ScaleTime<number, number>;
  xAxis: d3.Axis<number | Date | { valueOf(): number} >;
  xAxisLine: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  yAxisPercentage: d3.Axis<number | { valueOf(): number }>;
  yScalePercentage: d3.ScaleLinear<number, number>;
  yAxisPercentageInterest: d3.Axis<number | { valueOf(): number }>;
  // yScalePercentageInterest: d3.ScaleLinear<number, number>;

  yAxisPercentageLine: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  yAxisInterestLine: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  yScaleStocks: d3.ScaleLinear<number, number>;
  yAxisStocksLine: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  yAxisStocks: d3.Axis<number | { valueOf(): number }>;

  // new scales, calculated after zoom
  newXScale: d3.ScaleTime<number, number>;
  newYScalePercentage: d3.ScaleLinear<number, number>;
  newYScalePercentageInterest: d3.ScaleLinear<number, number>;
  newYScaleStocks: d3.ScaleLinear<number, number>;

  // line graphs
  lineM3: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineSP500: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineFEDFundsRate: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  // lineInterestRates: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  movingAverageData: any[];

  constructor(
    private lineGeneratorService: LineGeneratorService
  ) { }

  async ngOnInit() {

    this.lineGeneratorService.generateLine();

    this.zoomed$
      .pipe(debounceTime(5))
      .subscribe(() => this.recalculate());

    this.svg = d3.select('svg');

    // clipping region
    this.svg.append('defs')
       .append('clipPath')
       .attr('id', 'clip')
       .append('rect')
       .attr('width', svgWidth)
       .attr('height', height)
       .attr('x', margin.left - 10)
       .attr('y', margin.top - 10);

    // scale objects
    this.xScale = d3.scaleTime()
      .domain([new Date(1950, 0, 1), new Date()])
      .range([0, svgWidth]);
    this.yScalePercentage = d3.scaleLinear()
      .domain([0, 120])
      .range([height, 0]);
    // this.yScalePercentageInterest = d3.scaleLinear()
    //   .domain([0, 20])
    //   .range([height, 0]);
    this.yScaleStocks = d3.scaleLinear()
      .domain([0, 3000])
      .range([height, 0]);

    const xDateAccessor = d => this.xScale(d.date);
    const yPercentageAccessor = d => this.yScalePercentage(d.value);
    // const yPercentageInterestAccessor = d => this.yScalePercentageInterest(d.value);
    const yStockAccessor = d => this.yScaleStocks(d.value);

    // Axis objects
    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxisPercentage = d3.axisLeft(this.yScalePercentage);
    // this.yAxisPercentageInterest = d3.axisLeft(this.yScalePercentageInterest);
    this.yAxisStocks = d3.axisRight(this.yScaleStocks);

    // X and Y axis lines
    this.xAxisLine = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(this.xAxis);

    this.yAxisPercentageLine = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .style('color', axisLeftColor)
      .call(this.yAxisPercentage);

    // this.yAxisInterestLine = this.svg.append('g')
    //   .attr('transform', `translate(${margin.left + 25}, ${margin.top})`)
    //   .attr('stroke', axisLeftColor)
    //   .attr('stroke-width', 1)
    //   .call(this.yAxisPercentageInterest);

    this.yAxisStocksLine = this.svg.append('g')
      .attr('transform', `translate(${svgWidth + margin.left}, ${margin.top})`)
      .attr('class', 'axis-right')
      .style('color', axisRightColor)
      .call(this.yAxisStocks);

    // Line graphs
    this.lineM3 = this.svg
      .append('path')
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .datum(M3_OECD_DATA)
      .attr('fill', 'none')
      .attr('stroke', axisLeftColor)
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageAccessor)
      );

    this.lineSP500 = this.svg
      .append('path')
      .datum(SP500_DATA)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', axisRightColor)
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yStockAccessor)
      );

    // this.lineInterestRates = this.svg
    //   .append('path')
    //   .datum(OECDinterestRatesData)
    //   .attr('transform', `translate(${pointSize}, ${pointSize})`)
    //   .attr('clip-path', 'url(#clip)')
    //   .attr('fill', 'none')
    //   .attr('stroke', 'teal')
    //   .attr('stroke-width', 1)
    //   .attr('d', d3.line()
    //     .x((d: any) => this.xScale(d.date))
    //     .y((d: any) => this.yScalePercentage(d.value))
    //   );

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

    // Pan and zoom
    this.zoom = d3.zoom()
        .scaleExtent([.5, 20])
        .extent([[0, 0], [width, height]])
        .on('zoom', this.zoomed.bind(this));

    this.svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(this.zoom);


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
    this.initAxisTexts();

  }

  initAxisTexts() {

    // text label for the x axis
    this.svg
      .append('text')
      .attr('transform', `translate(${svgWidth / 2}, ${height + margin.top + 40})`)
      .style('text-anchor', 'middle')
      .text('Time');

    // text label for the left y axis
    this.svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', margin.left + 5)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('fill', axisLeftColor)
      .style('text-anchor', 'middle')
      .text('M3 money supply');

    // text label for the right y axis
    this.svg
      .append('text')
      .attr('transform', `translate(
        ${svgWidth + margin.left - 25}, ${height / 2}),
        rotate(-90)`
      )
      .attr('dy', '1em')
      .style('fill', axisRightColor)
      .style('text-anchor', 'middle')
      .text('S&P 500 Stock value');

  }

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

  zoomed() {
    // initial draw
    if (!d3.event) {
      this.newXScale = this.xScale;
      this.newYScalePercentage = this.yScalePercentage;
      // this.newYScalePercentageInterest = this.yScalePercentageInterest;
      this.newYScaleStocks = this.yScaleStocks;
    } else {
      this.newXScale = d3.event.transform.rescaleX(this.xScale);
      this.newYScalePercentage = d3.event.transform.rescaleY(this.yScalePercentage);
      // this.newYScalePercentageInterest = d3.event.transform.rescaleY(this.yScalePercentageInterest);
      this.newYScaleStocks = d3.event.transform.rescaleY(this.yScaleStocks);
    }
    // next onto debounced recalculation
    this.zoomed$.next();
  }

  recalculate() {
    // update axis
    this.xAxisLine.call(this.xAxis.scale(this.newXScale));
    this.yAxisPercentageLine.call(this.yAxisPercentage.scale(this.newYScalePercentage));
    // this.yAxisInterestLine.call(this.yAxisPercentageInterest.scale(this.newYScalePercentageInterest));
    this.yAxisStocksLine.call(this.yAxisStocks.scale(this.newYScaleStocks));

    this.lineM3.datum(M3_OECD_DATA)
      .attr('d', d3.line()
        .x((d: any) => this.newXScale(d.date))
        .y((d: any) => this.newYScalePercentage(d.value))
      );
    this.lineSP500.datum(SP500_DATA)
      .attr('d', d3.line()
        .x((d: any) => this.newXScale(d.date))
        .y((d: any) => this.newYScaleStocks(d.value))
      );
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

  }

}
