import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import * as d3 from 'd3';

import {
  axisLeftColor,
  axisRightColor,
  height,
  width,
  svgWidth,
  margin,
} from './graph-constants';

@Injectable({ providedIn: 'root' })
export class GraphService {

  private svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  private zoom: d3.ZoomBehavior<Element, unknown>; // actual zoom
  private zoomed$: Subject<void> = new Subject(); // debounce recalc

  xScale: d3.ScaleTime<number, number>;
  xAxis: d3.Axis<number | Date | { valueOf(): number} >;
  xAxisLine: d3.Selection<SVGGElement, unknown, HTMLElement, any>;

  yAxis: any = {
    left: {},
    right: {}
  };
  // : {
  //   left: Yaxis,
  //   right: any
  // };

  xAccessor: (d: any) => number;
  yPercentageAccessor: (d: any) => number;
  yStockAccessor: (d: any) => number;

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

  determineWidth: (d: any) => number;
  determineX: (d: any) => number;

  dataPerLine: Map<
    d3.Selection<any, any, any, any>,
    {data: any, yScale: string}>
  = new Map<
    d3.Selection<any, any, any, any>,
    {data: any, yScale: string}>();

  rectsToRecalculate: d3.Selection<d3.EnterElement, d3.DSVRowString<string>, d3.BaseType, unknown>[] = [];

  constructor() {
    this.zoomed$
      .pipe(debounceTime(3))
      .subscribe(() => this.recalculate());
  }

  setSvg(svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
    this.svg = svg;
    if (!svg) { return; }
    this.createClippingRegion();
    this.createXAxis();
    this.createYAxis('left', axisLeftColor, 0, 140);
    this.createYAxis('right', axisRightColor, 0, 3500);
    this.initAxisTexts();
    this.setupPanAndZoom();
  }

  getSvg() { return this.svg; }

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

    this.svg // text label for the right y axis
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


  recalculate(): void {
    // update axis
    this.xAxisLine.call(
      this.xAxis.scale(this.newXScale)
    );
    this.yAxis.left.line.call(
      this.yAxis.left.object.scale(this.newYScalePercentage)
    );
    this.yAxis.right.line.call(
      this.yAxis.right.object.scale(this.newYScaleStocks)
    );

    this.dataPerLine.forEach(
      (dataYScale, selection) => {
        selection.datum(dataYScale.data)
          .attr('d', d3.line()
          .x((d: any) => this.newXScale(d.date))
          .y((d: any) => this[dataYScale.yScale](d.value))
        );
      }
    );

    this.rectsToRecalculate.forEach(
      rectSelection => rectSelection
        .attr('x', d => this.determineX(d))
        .attr('width', d => this.determineWidth(d))
    );

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

      this.determineWidth = d =>
        this.newXScale(new Date(d.end)) - this.newXScale(new Date(d.start));
      this.determineX = d => this.newXScale(new Date(d.start));

      // const newXScaleYearDomain = this.graphUtilityService.newXScale.domain();
      // const maxXYear = Math.min(2100, newXScaleYearDomain[1].getFullYear());
      // this.graphUtilityService.newXScale.domain([newXScaleYearDomain[0], new Date(maxXYear)]);

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

  setToRecalculateLine(
    lineSelection: d3.Selection<any, any, any, any>,
    data: any,
    yScale: string
  ) {
    this.dataPerLine.set(
      lineSelection, { data, yScale }
    );
  }

  setToRecalculateRects(
    rectSelection: d3.Selection<d3.EnterElement, d3.DSVRowString<string>, d3.BaseType, unknown>,
  ) {
    this.rectsToRecalculate.push(
      rectSelection
    );
  }

}
