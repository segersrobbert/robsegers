import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({ providedIn: 'root' })
export class ShapeGeneratorService {

  constructor() { }

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

    // http://bl.ocks.org/TBD/600b23e56545026ae6fda2905efa42ce

  }

}
