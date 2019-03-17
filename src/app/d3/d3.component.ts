import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements AfterViewInit {

  @ViewChild('d3content') d3content: ElementRef;

  constructor() { }

  ngAfterViewInit() {

    const width = Math.max(960, innerWidth);
    const height = Math.max(500, innerHeight);
    let x1 = window.innerWidth / 2;
    let y1 = 125;
    let x0 = x1;
    let y0 = y1;
    let i = 0;
    const r = 200;
    const τ = 2 * Math.PI;

    const move = () => {
      const rect = this.d3content.nativeElement.getBoundingClientRect();
      x1 = d3.event.screenX - 5;
      y1 = d3.event.screenY - 270;
      d3.event.preventDefault();
    };

    const canvas = d3.select('#d3content')
      .append('canvas')
      .attr('width', width)
      .attr('height', height)
      .on('ontouchstart' in document ?
          'touchmove' : 'mousemove',
          move);

    const context = canvas.node().getContext('2d');
    context.globalCompositeOperation = 'lighter';
    context.lineWidth = 2;

    d3.timer(() => {
      context.clearRect(0, 0, width, height);

      const z = d3.hsl(++i % 360, 1, .5).rgb();
      const c = `rgba(${z.r},${z.g},${z.b},`;
      // const c = 'rgba(' + z.r + ',' + z.g + ',' + z.b + ',';
      const x = x0 += (x1 - x0) * .1;
      const y = y0 += (y1 - y0) * .1;

      d3.select({}).transition()
        .duration(2000)
        .ease(Math.sqrt)
        .tween('circle', () => {
          return (t) => {
            context.strokeStyle = c + (1 - t) + ')';
            context.beginPath();
            context.arc(x, y, r * t, 0, τ);
            context.stroke();
          };
        });
    });

  }

}

