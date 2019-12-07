import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({ providedIn: 'root' })
export class ShapeGeneratorService {

  currencies: any[];

  constructor() {

    let i; let j;
    this.currencies = [];

    for (i = j = 1; j <= 15; i = ++j) {
      this.currencies.push({
        tir: i,
        start: new Date(+(new Date()) - Math.floor(Math.random() * 1000000000)),
        end: new Date().setFullYear(2030,1,1)
      });
    }

  }

  generateLine(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    data: any,
    color: string,
    xAccessor: (d: any) => number,
    yAccessor: (d: any) => number
  ): d3.Selection<SVGPathElement, any, HTMLElement, any> {
    return svg
      .append('path')
      .attr('transform', `translate(10, 10)`)
      .attr('clip-path', 'url(#clip)')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(xAccessor)
        .y(yAccessor)
      );
  }


  generateRect(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    xScale: d3.ScaleTime<number, number>,
    x: number, y: number,
    width: number, height: number
  ): any {

    //    http://bl.ocks.org/TBD/600b23e56545026ae6fda2905efa42ce

    // const svgContainer = d3.select('body')
    //   .append('svg')
    //   .attr('width', 200)
    //   .attr('height', 200);

    const symbols = d3.nest()
      .key((d: any) => d.tir)
      .entries(this.currencies);

    const spanX = (d: any) => xScale(d3.isoParse(d.start));
    const spanW = (d: any) => xScale(d3.isoParse(d.end)) - xScale(d3.isoParse(d.start));

    const chart = (symbol) => {
      svg.selectAll('rect')
        .data(symbol.values)
        .enter()
        .append('rect')
          .attr('x', (d: any) => spanX(d))
          .attr('y', 0)
          .attr('width', (d: any) => spanW(d))
          .attr('height', height)
          .attr('fill',  (d: any) => d.color || '#ddf');
    };
    // add all charts
    const allCharts = svg
          .data(symbols)
          .enter()
          .append('svg')
            .attr('height', 500)
          .each(chart);

    return allCharts;


    // return svg.append('rect')
    //   .attr('x', x)
    //   .attr('y', y)
    //   // .attr('width', width)
    //   .attr('width', (d: any, i) => {
    //     return (d.ending_time - d.starting_time) * scaleFactor;
    //   })
    //   .attr('height', height);
  }

}
