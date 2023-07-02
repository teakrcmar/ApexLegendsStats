var lineChartSvg = null;
var overlay = null;

function popCharacter(character) {
  var popOutWindow = document.getElementById('popOutWindow');
  popOutWindow.style.display = 'block';

  // Fetch the JSON data
  fetch('https://raw.githubusercontent.com/teakrcmar/VP_projekt/main/legends.json')
    .then(response => response.json())
    .then(data => {
      // Find the legend object in the JSON data
      var legendData = data.legends.find(legend => legend.legend === character);

      if (legendData) {
        var lineChart = createLineChart(legendData.data);
        renderLineChart(lineChart, character); // Pass the lineChart and character to the renderLineChart function
      }
    })
    .catch(error => {
      console.error('Error fetching JSON data:', error);
    });
}


function createLineChart(data) {
  // Prepare the data for the line chart
  var lineChartData = data.map(entry => ({
    date: new Date(entry.date),
    rate: parseFloat(entry.rate)
  }));

  // Sort the data by date in ascending order
  lineChartData.sort((a, b) => a.date - b.date);

  return lineChartData;
}

function renderLineChart(data, legendName) {
  var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    width = 750 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.rate); });

  // Clear previous contents of the line chart SVG
  if (lineChartSvg) {
    lineChartSvg.selectAll('*').remove();
  }

  lineChartSvg = d3.select('.lineChart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, 15]);

  lineChartSvg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line);

  lineChartSvg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x)
      .tickFormat(d3.timeFormat('%b %d')));

  lineChartSvg.append('g')
    .attr('class', 'y-axis')
    .call(d3.axisLeft(y));

  lineChartSvg.append('text')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')')
    .style('text-anchor', 'middle')
    .text('Date');

  lineChartSvg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 - margin.left)
    .attr('x', 0 - (height / 2))
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('Rate (%)');

  lineChartSvg.append('text')
    .attr('transform', 'translate(' + (width / 2) + ',' + (margin.top - 10) + ')') // Adjust the y position of the title
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .text(legendName);

  // Create overlay for displaying values on hover
  overlay = lineChartSvg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none') // Set fill color to none or use 'transparent'
    .style('pointer-events', 'all')
    .on('mouseover', function () {
      focus.style('display', null);
    })
    .on('mouseout', function () {
      focus.style('display', 'none');
    })
    .on('mousemove', mousemove);


  var focus = lineChartSvg.append('g')
    .attr('class', 'focus')
    .style('display', 'none');

  focus.append('circle')
    .attr('r', 4.5);

  focus.append('text')
    .attr('x', 9)
    .attr('dy', '.35em');

    function mousemove(event) {
      var x0 = x.invert(d3.pointer(event)[0]);
      var bisectDate = d3.bisector(function(d) { return d.date; }).left;
      var i = bisectDate(data, x0, 1);
      var d0 = data[i - 1];
      var d1 = data[i];
      var d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    
      // Calculate the maximum x position for the tooltip based on the chart width
      var maxTooltipX = width - focus.select('text').node().getBBox().width - 10;
    
      var tooltipX = x(d.date);
      if (tooltipX > maxTooltipX) {
        tooltipX = maxTooltipX;
      }
    
      focus.attr('transform', 'translate(' + tooltipX + ',' + y(d.rate) + ')');
      focus.select('text')
        .attr('transform', 'rotate(-30)') // Rotate the text to 30 degrees (1 o'clock position)
        .style('font-size', '12px') // Set the font size to 12px
        .text('Rate: ' + d.rate + '% | Date: ' + d.date.toDateString());
    }
}



function closePopOutWindow() {
  var popOutWindow = document.getElementById('popOutWindow');
  popOutWindow.style.display = 'none';

  // Clear the line chart SVG
  if (lineChartSvg) {
    lineChartSvg.selectAll('*').remove();
  }
}
