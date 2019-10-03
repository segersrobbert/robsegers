    const n = 50; // number of points
    const max = 100; // maximum of x and y

    // dimensions and margins
    const svg = d3.select('svg');
    let width = window.innerWidth;
    let height = window.innerHeight;
    width = 0.8 * width;
    height = 0.6 * height;
    const margin = { top: (0.1 * width), right: (0.1 * width), bottom: (0.1 * width), left: (0.1 * width) };

    // create a clipping region
    svg.append('defs')
       .append('clipPath')
       .attr('id', 'clip')
       .append('rect')
       .attr('width', width)
       .attr('height', height);

    // create scale objects
    const xScale = d3.scaleLinear()
      .domain([max, 0])
      .range([0, width]);
    const yScale = d3.scaleLinear()
      .domain([max, 0])
      .range([height, 0]);
    // create axis objects
    const xAxis = d3.axisBottom(xScale)
      .ticks(20, 's');
    const yAxis = d3.axisLeft(yScale)
      .ticks(20, 's');
    // Draw Axis
    const gX = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + (margin.top + height) + ')')
      .call(xAxis);
    const gY = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(yAxis);

    // Draw Datapoints
    const points_g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .attr('clip-path', 'url(#clip)')
      .classed('points_g', true);

    const data = genRandomData (n, max);
    let points = points_g.selectAll('circle').data(data);
    points = points.enter().append('circle')
          .attr('cx', function(d) {return xScale(d.x)})
          .attr('cy', function(d) {return yScale(d.y)})
          .attr('r', 5);

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
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(zoom);

    function genRandomData(n, max) {
      const data = [];
      let datapoint = {};
      for (let i = 0; i < n; i++) {
        datapoint = {};
        datapoint['x'] = Math.random() * max;
        datapoint['y'] = Math.random() * max;
        data.push(datapoint);
      }
      return data
    }

    function zoomed() {
    // create new scale ojects based on event
      const new_xScale = d3.event.transform.rescaleX(xScale);
      const new_yScale = d3.event.transform.rescaleY(yScale);
    // update axes
      gX.call(xAxis.scale(new_xScale));
      gY.call(yAxis.scale(new_yScale));
      points.data(data)
        .attr('cx', function(d) {return new_xScale(d.x)})
        .attr('cy', function(d) {return new_yScale(d.y)});
    }

  