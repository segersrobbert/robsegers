import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as d3 from 'd3';

import { OECDinterestRatesData } from '../../../data/OECD_interest_rates';
import { M3_OECD_DATA } from '../../../data/M3_OECD';
import { SP500_DATA } from '../../../data/sp500';
import { ShapeGeneratorService } from '../services/shape-generator.service';

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
const axisRightColor = 'steelblue';
const axisLeftColor = 'darkred';

interface Yaxis {
  scale: d3.ScaleLinear<number, number>;
  object: d3.Axis<number | { valueOf(): number }>;
  line: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
}

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
    // ATTRIBUTION: Proper attribution requires clear indication of the data source as 'www.macrotrends.net'.
    // A "dofollow" backlink to the originating page is also required if the data is displayed on a web page.

  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  zoom: d3.ZoomBehavior<Element, unknown>; // actual zoom
  zoomed$: Subject<void> = new Subject(); // debounce recalc

  xScale: d3.ScaleTime<number, number>;
  xAxis: d3.Axis<number | Date | { valueOf(): number} >;
  xAxisLine: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  xAccessor: (d: any) => number;
  yPercentageAccessor: (d: any) => number;
  yStockAccessor: (d: any) => number;

  yAxis: any = {
    left: {},
    right: {}
  };
  // : {
  //   left: Yaxis,
  //   right: any
  // };

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
  // lineFEDFundsRate: d3.Selection<SVGPathElement, any, HTMLElement, any>;

  currencies: d3.Selection<d3.EnterElement, d3.DSVRowString<string>, d3.BaseType, unknown>;
  determineWidth: (d: any) => number;
  determineX: (d: any) => number;

  constructor(
    private shapeGeneratorService: ShapeGeneratorService
  ) { }

  async ngOnInit() {

    this.zoomed$
      .pipe(debounceTime(5))
      .subscribe(() => this.recalculate());

    this.svg = d3.select('svg');
    this.createClippingRegion();
    this.createXAxis();
    this.createYAxis('left', axisLeftColor, 0, 140);
    this.createYAxis('right', axisRightColor, 0, 3500);
    this.initAxisTexts();
    this.setupPanAndZoom();

    this.xAccessor = d => this.xScale(d.date);
    this.yPercentageAccessor = d => this.yAxis.left.scale(d.value);
    // this.yPercentageInterestAccessor = d => this.yScalePercentageInterest(d.value);
    this.yStockAccessor = d => this.yAxis.right.scale(d.value);

    // Line graphs
    this.lineM3 = this.shapeGeneratorService.generateLine(
      this.svg,
      M3_OECD_DATA,
      axisLeftColor,
      this.xAccessor,
      this.yPercentageAccessor
    );

    this.lineSP500 = this.shapeGeneratorService.generateLine(
      this.svg,
      SP500_DATA,
      axisRightColor,
      this.xAccessor,
      this.yStockAccessor
    );

    const currenciesData = await d3.csv('../../../data/reserveCurrencies.csv');
    this.currencies = this.shapeGeneratorService.createCurrencyRects(
      this.svg,
      height,
      currenciesData,
      this.determineWidth,
      this.determineX
    );

  }

  setupPanAndZoom() {
    this.zoom = d3.zoom()
      .scaleExtent([.05, 100])
      .extent([[0, 0], [width, height]])
      .on('zoom', this.zoomed.bind(this));
    this.svg.append('rect')
      .attr('class', 'setup panZoom')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(this.zoom);
  }

  createClippingRegion(): void {
    this.svg.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('class', 'setup clippingRegion')
      .attr('width', svgWidth)
      .attr('height', height)
      .attr('x', margin.left - 10)
      .attr('y', margin.top - 10);
  }

  createXAxis(): void {
    this.xScale = d3.scaleTime()
      .domain([new Date(1960, 0, 1), new Date()])
      .range([0, svgWidth]);

    this.xAxis = d3.axisBottom(this.xScale);

    this.xAxisLine = this.svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(this.xAxis);

    this.determineWidth = d => this.xScale(new Date(d.end)) - this.xScale(new Date(d.start));
    this.determineX = d => this.xScale(new Date(d.start));
  }

  createYAxis(
    side: 'left' | 'right',
    color: string,
    domainStart: number,
    domainEnd: number,
  ): void {
    let axisWidthSurplus = 0;
    let axisObjectCreationOp = d3.axisLeft;
    let rightAxis = 0;
    if (side === 'right') {
      axisWidthSurplus = svgWidth;
      axisObjectCreationOp = d3.axisRight;
      rightAxis = svgWidth;
    }
    // Y axis scale
    this.yAxis[side].scale = d3.scaleLinear()
      .domain([domainStart, domainEnd])
      .range([height, 0]);
    // Y axis object
    this.yAxis[side].object = axisObjectCreationOp(this.yAxis[side].scale);
    // Y axis line
    this.yAxis[side].line = this.svg.append('g')
      .attr('transform', `translate(${rightAxis + margin.left}, ${margin.top})`)
      .style('color', color)
      .call(this.yAxis[side].object);
  }

  initAxisTexts(): void {
    this.svg // text label for the x axis
      .append('text')
      .attr('transform', `translate(${svgWidth / 2}, ${height + margin.top + 40})`)
      .style('text-anchor', 'middle')
      .text('Time');

    this.svg // text label for the left y axis
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


  zoomed(): void {
    // initial draw
    if (!d3.event) {
      this.newXScale = this.xScale;
      this.newYScalePercentage = this.yAxis.left.scale;
      // this.newYScalePercentageInterest = this.yScalePercentageInterest;
      this.newYScaleStocks = this.yAxis.right.scale;
    } else {
      this.newXScale = d3.event.transform.rescaleX(this.xScale);
      this.newYScalePercentage = d3.event.transform.rescaleY(this.yAxis.left.scale);
      this.newYScaleStocks = d3.event.transform.rescaleY(this.yAxis.right.scale);

      this.determineWidth = d => this.newXScale(new Date(d.end)) - this.newXScale(new Date(d.start));
      this.determineX = d => this.newXScale(new Date(d.start));

      // const newXScaleYearDomain = this.newXScale.domain();
      // const maxXYear = Math.min(2100, newXScaleYearDomain[1].getFullYear());
      // this.newXScale.domain([newXScaleYearDomain[0], new Date(maxXYear)]);

      // force minimum Y scale to 0
      const newYScalePercentageDomain = this.newYScalePercentage.domain();
      const maxYPercentage = Math.min(140, newYScalePercentageDomain[1]);
      this.newYScalePercentage.domain([0, maxYPercentage]);

      const newYScaleStocksDomain = this.newYScaleStocks.domain();
      const maxYStocks = Math.min(3500, newYScaleStocksDomain[1]);
      this.newYScaleStocks.domain([0, maxYStocks]);

      // this.newYScalePercentageInterest = d3.event.transform.rescaleY(this.yScalePercentageInterest);
    }
    // next onto debounced recalculation
    this.zoomed$.next();
  }

  recalculate(): void {
    // update axis
    this.xAxisLine.call(this.xAxis.scale(this.newXScale));
    this.yAxis.left.line.call(this.yAxis.left.object.scale(this.newYScalePercentage));
    this.yAxis.right.line.call(this.yAxis.right.object.scale(this.newYScaleStocks));

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

    this.currencies
      .attr('x', (d: any) => this.determineX(d))
      .attr('width', (d: any) => this.determineWidth(d));

  }

}
