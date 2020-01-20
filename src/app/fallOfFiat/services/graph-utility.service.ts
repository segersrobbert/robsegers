import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class GraphService {

  svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  zoom: d3.ZoomBehavior<Element, unknown>; // actual zoom
  zoomed$: Subject<void> = new Subject(); // debounce recalc

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


  constructor() { }

}
