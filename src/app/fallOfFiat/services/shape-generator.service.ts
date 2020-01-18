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

  createCurrencyRects(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    height,
    data: any,
    determineWidth,
    determineX
  ): any {
    const tooltip = d3.select('body')
      .append('div')
      .style('font-size', '12px')
      .style('width', '285px')
      .style('position', 'absolute')
      .style('top', '225px')
      .style('left', '40px');

    // http://bl.ocks.org/TBD/600b23e56545026ae6fda2905efa42ce
    const currencies = svg
    .selectAll('rect')
      // there are setup rects on the svg (pan & clipping area)
      // that need to be filtered out from the selection
      // use ES5 filter function to have 'this' refer to the current DOM element
      .filter(function (d, i) {
        if ((this as HTMLElement).classList.contains('setup')) {
          return false;
        }
        return true;
      })
      .data(data)
      // enter identifies any elements that need to be added
      // when the data array is longer than the selection
      .enter()
      .append('rect')
      .attr('x', d => determineX(d))
      .attr('y', height - 25)
      // .attr('transform', d => `translate(
      //   ${determineX(d)},
      //   ${height - 25})`
      // )
      .attr('width', d => determineWidth(d))
      .attr('height', 50)
      .attr('fill', 'green')
      .style('opacity', 0.2)
      .attr('stroke-width', '2px')
      .attr('stroke', 'black')
      .on('mouseover', (d: any) => tooltip.html(
        `Reserve currency: ${d.currency} <br> Country: ${d.country}`
      ))
      .on('mouseout', () => tooltip.html(''));
    console.log("TCL: ShapeGeneratorService -> constructor -> currencies", currencies)
    return currencies;
      // .append('text')
      // .attr('x', d => {
      //   console.log('TCL: OverviewComponent -> ngOnInit -> d', d)
      //   return spanX(d)
      // })
      // .attr('y', 25)
      // .text(d => d.currency)

  }

}
