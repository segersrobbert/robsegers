import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

  zoomed$: Subject<void> = new Subject();

  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

  xScale: d3.ScaleTime<number, number>;
  xAxis: d3.Axis<number | Date | { valueOf(): number} >;
  gX: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  yAxisPercentage: d3.Axis<number | { valueOf(): number }>;
  yScalePercentage: d3.ScaleLinear<number, number>;
  yScalePercentageInterest: d3.ScaleLinear<number, number>;
  yAxisPercentageInterest: d3.Axis<number | { valueOf(): number }>;
  yScaleSP500: d3.ScaleLinear<number, number>; // RENAME TO yScaleStocks
  gY: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  gYinterest: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  gYSP500: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
  yAxisSP500: d3.Axis<number | { valueOf(): number }>;

  newXScale: d3.ScaleTime<number, number>;
  newYScalePercentage: d3.ScaleLinear<number, number>;
  newYScalePercentageInterest: d3.ScaleLinear<number, number>;
  newYScaleStocks: d3.ScaleLinear<number, number>;

  lineM3: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineSP500: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineFEDFundsRate: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineFEDFundsRate2: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineFEDFundsRate3: d3.Selection<SVGPathElement, any, HTMLElement, any>;

  constructor() { }

  ngOnInit() {

    this.zoomed$
      .pipe(debounceTime(50))
      .subscribe(() => {
        console.log("TCL: OverviewComponent -> ngOnInit -> recalculate")
        this.recalculate();
      });

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

    this.yScalePercentage = d3.scaleLinear()
      .domain([0, 120])
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
    const yPercentageInterestAccessor = d => this.yScalePercentageInterest(d.value);
    const yStockAccessor = d => yScaleSP500(d.value);

    // create axis objects
    this.xAxis = d3.axisBottom(xScale);

    this.yAxisPercentage = d3.axisLeft(this.yScalePercentage);
    this.yAxisPercentageInterest = d3.axisLeft(this.yScalePercentageInterest);

    this.yAxisSP500 = d3.axisRight(yScaleSP500);

    // Draw Axis
    this.gX = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(this.xAxis);

    this.gY = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .call(this.yAxisPercentage);

    this.gYinterest = this.svg.append('g')
      .attr('transform', `translate(${margin.left + 25}, ${margin.top})`)
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .call(this.yAxisPercentageInterest);

    this.gYSP500 = this.svg.append('g')
      .attr('transform', `translate(${svgWidth + margin.left}, ${margin.top})`)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .call(this.yAxisSP500);

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
        .on('zoom', this.zoomed.bind(this))
        .on('zoom', this.recalculate.bind(this));

    this.svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(zoom as any);

  }

  zoomed() {
    console.log("TCL: OverviewComponent -> zoomed -> zoomed")
    this.zoomed$.next();
  }

  recalculate() {
    console.log("TCL: OverviewComponent -> recalculate -> recalculate")

    if (!d3.event) { // initial draw
      this.newXScale = this.xScale;
      this.newYScalePercentage = this.yScalePercentage;
      this.newYScalePercentageInterest = this.yScalePercentageInterest;
      this.newYScaleStocks = this.yScaleSP500;
    } else {
      this.newXScale = d3.event.transform.rescaleX(this.xScale);
      this.newYScalePercentage = d3.event.transform.rescaleY(this.yScalePercentage);
      this.newYScalePercentageInterest = d3.event.transform.rescaleY(this.yScalePercentageInterest);
      this.newYScaleStocks = d3.event.transform.rescaleY(this.yScaleSP500);
    }
    // update axes
    this.gX.call(this.xAxis.scale(this.newXScale));
    this.gY.call(this.yAxisPercentage.scale(this.newYScalePercentage));
    this.gYinterest.call(this.yAxisPercentageInterest.scale(this.newYScalePercentageInterest));
    this.gYSP500.call(this.yAxisSP500.scale(this.newYScaleStocks));

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
    // lineInterestRates.datum(OECDinterestRatesData)
    //   .attr('d', d3.line()
    //     .x(d => this.newXScale(d.date))
    //     .y(d => newYScalePercentageInterest(d.value))
    //   );

    this.lineFEDFundsRate.datum(FED_funds_rate)
      .attr('d', d3.line()
        .x((d: any) => this.newXScale(d.date))
        .y((d: any) => this.newYScalePercentageInterest(d.value))
      );
    this.lineFEDFundsRate2.datum(FED_funds_rate2)
      .attr('d', d3.line()
        .x((d: any) => this.newXScale(d.date))
        .y((d: any) => this.newYScalePercentageInterest(d.value))
      );
    this.lineFEDFundsRate3.datum(FED_funds_rate3)
      .attr('d', d3.line()
        .x((d: any) => this.newXScale(d.date))
        .y((d: any) => this.newYScalePercentageInterest(d.value))
      );
  }

}
