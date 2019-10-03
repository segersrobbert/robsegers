import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

import { M3_OECD_DATA } from '../../../data/M3_OECD';
import { SP500_DATA } from '../../../data/sp500';
// import { OECDinterestRatesData } from '../../../data/OECD_interest_rates';
import { FED_funds_rate } from '../../../data/FED_funds_rate';
import { FED_funds_rate2 } from '../../../data/FED_funds_rate2';
import { FED_funds_rate3 } from '../../../data/FED_funds_rate3';

interface DateValue {
  date: Date;
  value: number;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass']
})
export class OverviewComponent implements OnInit {

  // https://bl.ocks.org/mbostock/4015254
  // https://bl.ocks.org/mbostock/431a331294d2b5ddd33f947cf4c81319

  // Sources:
  // M3 money supply: data.oecd.org/money/broad-money-m3.htm
  // SP500 stocks: https://finance.yahoo.com/quote/%5EGSPC/history
  // OECD interest rates: https://data.oecd.org/interest/long-term-interest-rates.htm#indicator-chart
  // FED funds rate: https://www.macrotrends.net/2015/fed-funds-rate-historical-chart
    // ATTRIBUTION: Proper attribution requires clear indication of the data source as "www.macrotrends.net".
    // A "dofollow" backlink to the originating page is also required if the data is displayed on a web page.

  constructor() { }

  ngOnInit() {

    // dimensions and margins
    const svg = d3.select('svg');
    const width = window.innerWidth;
    const height = 0.65 * window.innerHeight;
    const svgWidth = 0.85 * width;
    const margin = {
      top: (0.05 * height),
      right: (0.05 * width),
      bottom: (0.05 * height),
      left: Math.max((0.05 * width), 30)
    };

    // clipping region
    svg.append('defs')
       .append('clipPath')
       .attr('id', 'clip')
       .append('rect')
       .attr('width', svgWidth)
       .attr('height', height)
       .attr('x', margin.left - 10)
       .attr('y', margin.top - 10);

    // scale objects
    const xScale = d3.scaleTime()
      .domain([new Date(1950, 0, 1), new Date()])
      .range([0, svgWidth]);
    const yScalePercentage = d3.scaleLinear()
      .domain([0, 120])
      .range([height, 0]);
    const yScalePercentageInterest = d3.scaleLinear()
      .domain([0, 20])
      .range([height, 0]);
    const yScaleSP500 = d3.scaleLinear()
      .domain([0, 3000])
      .range([height, 0]);
    // create axis objects
    const xAxis = d3.axisBottom(xScale);
    const yAxisPercentage = d3.axisLeft(yScalePercentage);
    const yAxisPercentageInterest = d3.axisLeft(yScalePercentageInterest);
    const yAxisSP500 = d3.axisRight(yScaleSP500);
    // Draw Axis
    const gX = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top + height})`)
      .call(xAxis);
    const gY = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .call(yAxisPercentage);
    const gYinterst = svg.append('g')
      .attr('transform', `translate(${margin.left + 25}, ${margin.top})`)
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .call(yAxisPercentageInterest);
    const gYSP500 = svg.append('g')
      .attr('transform', `translate(${svgWidth + margin.left}, ${margin.top})`)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .call(yAxisSP500);

    const pointSize = 10;
    const lineM3 = svg
      .append('path')
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .datum(M3_OECD_DATA)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(d => xScale(d.date))
        .y(d => yScalePercentage(d.value))
      );

    const lineSP500 = svg
      .append('path')
      .datum(SP500_DATA)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(d => xScale(d.date))
        .y(d => yScaleSP500(d.value))
      );

    // const lineInterestRates = svg
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

    const lineFEDFundsRate = svg
      .append('path')
      .datum(FED_funds_rate)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(d => xScale(d.date))
        .y(d => yScalePercentageInterest(d.value))
      );

    const lineFEDFundsRate2 = svg
      .append('path')
      .datum(FED_funds_rate2)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(d => xScale(d.date))
        .y(d => yScalePercentageInterest(d.value))
      );
    const lineFEDFundsRate3 = svg
      .append('path')
      .datum(FED_funds_rate3)
      .attr('transform', `translate(${pointSize}, ${pointSize})`)
      .attr('clip-path', 'url(#clip)')
      .attr('fill', 'none')
      .attr('stroke', 'teal')
      .attr('stroke-width', 1)
      .attr('d', d3.line()
        .x(d => xScale(d.date))
        .y(d => yScalePercentageInterest(d.value))
      );

    // Pan and zoom
    const zoom = d3.zoom()
        .scaleExtent([.5, 20])
        .extent([[0, 0], [width, height]])
        .on('zoom', zoomed);

    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(zoom);

    function zoomed() {
      let newXScale;
      let newYScalePercentage;
      let newYScalePercentageInterest;
      let newYScaleStocks;
      if (!d3.event) { // initial draw
        newXScale = xScale;
        newYScalePercentage = yScalePercentage;
        newYScalePercentageInterest = yScalePercentageInterest;
        newYScaleStocks = yScaleSP500;
      } else {
        newXScale = d3.event.transform.rescaleX(xScale);
        newYScalePercentage = d3.event.transform.rescaleY(yScalePercentage);
        newYScalePercentageInterest = d3.event.transform.rescaleY(yScalePercentageInterest);
        newYScaleStocks = d3.event.transform.rescaleY(yScaleSP500);
      }
      // update axes
      gX.call(xAxis.scale(newXScale));
      gY.call(yAxisPercentage.scale(newYScalePercentage));
      gYinterst.call(yAxisPercentageInterest.scale(newYScalePercentageInterest));
      gYSP500.call(yAxisSP500.scale(newYScaleStocks));

      lineM3.datum(M3_OECD_DATA)
        .attr('d', d3.line()
          .x(d => newXScale(d.date))
          .y(d => newYScalePercentage(d.value))
        );
      lineSP500.datum(SP500_DATA)
        .attr('d', d3.line()
          .x(d => newXScale(d.date))
          .y(d => newYScaleStocks(d.value))
        );
      // lineInterestRates.datum(OECDinterestRatesData)
      //   .attr('d', d3.line()
      //     .x(d => newXScale(d.date))
      //     .y(d => newYScalePercentageInterest(d.value))
      //   );

      lineFEDFundsRate.datum(FED_funds_rate)
        .attr('d', d3.line()
          .x(d => newXScale(d.date))
          .y(d => newYScalePercentageInterest(d.value))
        );
      lineFEDFundsRate2.datum(FED_funds_rate2)
        .attr('d', d3.line()
          .x(d => newXScale(d.date))
          .y(d => newYScalePercentageInterest(d.value))
        );
      lineFEDFundsRate3.datum(FED_funds_rate3)
        .attr('d', d3.line()
          .x(d => newXScale(d.date))
          .y(d => newYScalePercentageInterest(d.value))
        );
    }
    zoomed(); // initial draw

  }

  zoomed() {
    console.log('zoomed');
  }

}
