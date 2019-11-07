import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

// import { OECDinterestRatesData } from '../../../data/OECD_interest_rates';
import { M3_OECD_DATA } from '../../../data/M3_OECD';
import { SP500_DATA } from '../../../data/sp500';
import { FED_funds_rate } from '../../../data/FED_funds_rate';
import { FED_funds_rate2 } from '../../../data/FED_funds_rate2';
import { FED_funds_rate3 } from '../../../data/FED_funds_rate3';

export interface DateValue {
  date: Date;
  value: number;
}

const width = window.innerWidth;
const height = 0.65 * window.innerHeight;
const svgWidth = 0.85 * width;
const margin = {
  top: (0.05 * height),
  right: (0.05 * width),
  bottom: (0.05 * height),
  left: Math.max((0.05 * width), 30)
};

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


  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

  // from 1950 untill now
  xScale: d3.ScaleTime<number, number>;
  xAxis: d3.Axis<number | Date | { valueOf(): number} >;
  gX: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  yAxisPercentage: d3.Axis<number | { valueOf(): number }>;
  yScalePercentage: d3.ScaleLinear<number, number>;
  yScalePercentageInterest: d3.ScaleLinear<number, number>;
  yAxisPercentageInterest: d3.Axis<number | { valueOf(): number }>;
  yScaleSP500: d3.ScaleLinear<number, number>;
  gY: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  gYinterest: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  gYSP500: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  yAxisSP500: d3.Axis<number | { valueOf(): number }>;

  lineM3: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineSP500: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineFEDFundsRate: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineFEDFundsRate2: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineFEDFundsRate3: d3.Selection<SVGPathElement, any, HTMLElement, any>;

  constructor() { }

  ngOnInit() {

    // dimensions and margins
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
    const xScale = d3.scaleTime()
      // from 1950 untill now
      .domain([new Date(1950, 0, 1), new Date()])
      .range([0, svgWidth]);

    this.xScale = d3.scaleTime()
      .domain([new Date(1950, 0, 1), new Date()])
      .range([0, svgWidth]);

    const yScalePercentage = d3.scaleLinear()
      .domain([0, 120])
      .range([height, 0]);
    this.yScalePercentage = d3.scaleLinear()
      .domain([0, 120])
      .range([height, 0]);

    const yScalePercentageInterest = d3.scaleLinear()
      .domain([0, 20])
      .range([height, 0]);
    this.yScalePercentageInterest = d3.scaleLinear()
      .domain([0, 20])
      .range([height, 0]);
    this.yScalePercentageInterest = d3.scaleLinear()
      .domain([0, 20])
      .range([height, 0]);
    const yScaleSP500 = d3.scaleLinear()
      .domain([0, 3000])
      .range([height, 0]);
    this.yScaleSP500 = d3.scaleLinear()
      .domain([0, 3000])
      .range([height, 0]);

    const xDateAccessor = d => this.xScale(d.date);
    const yPercentageInterestAccessor = d => yScalePercentageInterest(d.value);
    const yStockAccessor = d => yScaleSP500(d.value);

    // create axis objects
    const xAxis = d3.axisBottom(xScale);
    this.xAxis = d3.axisBottom(xScale);

    const yAxisPercentage = d3.axisLeft(this.yScalePercentage);
    this.yAxisPercentage = d3.axisLeft(this.yScalePercentage);
    const yAxisPercentageInterest = d3.axisLeft(yScalePercentageInterest);
    this.yAxisPercentageInterest = d3.axisLeft(yScalePercentageInterest);

    const yAxisSP500 = d3.axisRight(yScaleSP500);
    this.yAxisSP500 = d3.axisRight(yScaleSP500);

    // Draw Axis
    const gX = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(xAxis);
    this.gX = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(xAxis);

    const gY = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .call(yAxisPercentage);

    this.gY = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .call(yAxisPercentage);

    const gYinterest = this.svg.append('g')
      .attr('transform', `translate(${margin.left + 25}, ${margin.top})`)
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .call(yAxisPercentageInterest);
    this.gYinterest = this.svg.append('g')
      .attr('transform', `translate(${margin.left + 25}, ${margin.top})`)
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .call(yAxisPercentageInterest);

    const gYSP500 = this.svg.append('g')
      .attr('transform', `translate(${svgWidth + margin.left}, ${margin.top})`)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .call(yAxisSP500);
    this.gYSP500 = this.svg.append('g')
      .attr('transform', `translate(${svgWidth + margin.left}, ${margin.top})`)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .call(yAxisSP500);

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
      .attr('y', margin.left - 50)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Percentage');

    // text label for the right y axis
    this.svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', width - 100)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Stock value');

    const pointSize = 10;
    const lineM3 = this.svg
      .append('path')
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .datum(M3_OECD_DATA)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageInterestAccessor)
      );
    this.lineM3 = this.svg
      .append('path')
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .datum(M3_OECD_DATA)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageInterestAccessor)
      );

    const lineSP500 = this.svg
      .append('path')
      .datum(SP500_DATA)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yStockAccessor)
      );
    this.lineSP500 = this.svg
      .append('path')
      .datum(SP500_DATA)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yStockAccessor)
      );

    // const lineInterestRates = this.svg
    //   .append('path')
    //   .datum(OECDinterestRatesData)
    //   .attr('transform', `translate(${pointSize}, ${pointSize})`)
    //   .attr('clip-path', 'url(#clip)')
    //   .attr('fill', 'none')
    //   .attr('stroke', 'teal')
    //   .attr('stroke-width', 1)
    //   .attr('d', d3.line()
    //     .x(d => xScale(d.date))
    //     .y(d => yScalePercentage(d.value))
    //   );

    const lineFEDFundsRate = this.svg
      .append('path')
      .datum(FED_funds_rate)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageInterestAccessor)
      );
    this.lineFEDFundsRate = this.svg
      .append('path')
      .datum(FED_funds_rate)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageInterestAccessor)
      );

    const lineFEDFundsRate2 = this.svg
      .append('path')
      .datum(FED_funds_rate2)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageInterestAccessor)
      );
    this.lineFEDFundsRate2 = this.svg
      .append('path')
      .datum(FED_funds_rate2)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageInterestAccessor)
      );
    const lineFEDFundsRate3 = this.svg
      .append('path')
      .datum(FED_funds_rate3)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageInterestAccessor)
      );
    this.lineFEDFundsRate3 = this.svg
      .append('path')
      .datum(FED_funds_rate3)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xDateAccessor)
        .y(yPercentageInterestAccessor)
      );

    // Pan and zoom
    const zoom = d3.zoom()
        .scaleExtent([.5, 20])
        .extent([[0, 0], [width, height]])
        .on('zoom', this.zoomed.bind(this));

    this.svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(zoom as any);

  }

  zoomed() {
    let newXScale;
    let newYScalePercentage;
    let newYScalePercentageInterest;
    let newYScaleStocks;
    if (!d3.event) { // initial draw
      newXScale = this.xScale;
      newYScalePercentage = this.yScalePercentage;
      newYScalePercentageInterest = this.yScalePercentageInterest;
      newYScaleStocks = this.yScaleSP500;
    } else {
      newXScale = d3.event.transform.rescaleX(this.xScale);
      newYScalePercentage = d3.event.transform.rescaleY(this.yScalePercentage);
      newYScalePercentageInterest = d3.event.transform.rescaleY(this.yScalePercentageInterest);
      newYScaleStocks = d3.event.transform.rescaleY(this.yScaleSP500);
    }
    // update axes
    this.gX.call(this.xAxis.scale(newXScale));
    this.gY.call(this.yAxisPercentage.scale(newYScalePercentage));
    this.gYinterest.call(this.yAxisPercentageInterest.scale(newYScalePercentageInterest));
    this.gYSP500.call(this.yAxisSP500.scale(newYScaleStocks));

    this.lineM3.datum(M3_OECD_DATA)
      .attr('d', d3.line()
        .x((d: any) => newXScale(d.date))
        .y((d: any) => newYScalePercentage(d.value))
      );
    this.lineSP500.datum(SP500_DATA)
      .attr('d', d3.line()
        .x((d: any) => newXScale(d.date))
        .y((d: any) => newYScaleStocks(d.value))
      );
    // lineInterestRates.datum(OECDinterestRatesData)
    //   .attr('d', d3.line()
    //     .x(d => newXScale(d.date))
    //     .y(d => newYScalePercentageInterest(d.value))
    //   );

    this.lineFEDFundsRate.datum(FED_funds_rate)
      .attr('d', d3.line()
        .x((d: any) => newXScale(d.date))
        .y((d: any) => newYScalePercentageInterest(d.value))
      );
    this.lineFEDFundsRate2.datum(FED_funds_rate2)
      .attr('d', d3.line()
        .x((d: any) => newXScale(d.date))
        .y((d: any) => newYScalePercentageInterest(d.value))
      );
    this.lineFEDFundsRate3.datum(FED_funds_rate3)
      .attr('d', d3.line()
        .x((d: any) => newXScale(d.date))
        .y((d: any) => newYScalePercentageInterest(d.value))
      );
  }

}
