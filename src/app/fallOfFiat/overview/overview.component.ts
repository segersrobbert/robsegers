import {
  Component,
  OnInit
} from '@angular/core';
import * as d3 from 'd3';

import { OECDinterestRatesData } from '../../../data/OECD_interest_rates';
import { M3_OECD_DATA } from '../../../data/M3_OECD';
import { SP500_DATA } from '../../../data/sp500';
import { ShapeGeneratorService } from '../services/shape-generator.service';
import { GraphService } from '../services/graph-utility.service';
import {
  axisLeftColor,
  axisRightColor,
  height
} from '../services/graph-constants';

export interface DateValue { date: Date; value: number; }

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

  // line graphs
  lineM3: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  lineSP500: d3.Selection<SVGPathElement, any, HTMLElement, any>;
  // lineFEDFundsRate: d3.Selection<SVGPathElement, any, HTMLElement, any>;

  currencies: d3.Selection<d3.EnterElement, d3.DSVRowString<string>, d3.BaseType, unknown>;

  constructor(
    private shapeGeneratorService: ShapeGeneratorService,
    private graphService: GraphService
  ) { }

  async ngOnInit() {

    this.graphService.setSvg(d3.select('svg'));

    this.graphService.xAccessor = d => this.graphService.xScale(d.date);
    this.graphService.yPercentageAccessor = d => this.graphService.yAxis.left.scale(d.value);
    // this.yPercentageInterestAccessor = d => this.yScalePercentageInterest(d.value);
    this.graphService.yStockAccessor = d => this.graphService.yAxis.right.scale(d.value);

    // Line graphs
    this.lineM3 = this.shapeGeneratorService.generateLine(
      M3_OECD_DATA,
      axisLeftColor,
      this.graphService.xAccessor,
      this.graphService.yPercentageAccessor
    );
    this.graphService.setToRecalculateLine(
      this.lineM3,
      M3_OECD_DATA,
      'newYScalePercentage'
    );

    this.lineSP500 = this.shapeGeneratorService.generateLine(
      SP500_DATA,
      axisRightColor,
      this.graphService.xAccessor,
      this.graphService.yStockAccessor
    );
    this.graphService.setToRecalculateLine(
      this.lineSP500,
      SP500_DATA,
      'newYScaleStocks'
    );

    const currenciesData = await d3.csv('../../../data/reserveCurrencies.csv');
    this.currencies = this.shapeGeneratorService.createCurrencyRects(
      height,
      currenciesData,
      this.graphService.determineWidth,
      this.graphService.determineX
    );
    this.graphService.setToRecalculateRects(
      this.currencies,
      this.graphService.determineWidth,
      this.graphService.determineX
    );

  }

}
