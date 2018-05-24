# react-responsivefy

## Overview
Brendan Sudol created an awesome function for scaling D3 widgets to the proper
aspect ratio whenever the browser window was resized. He called this function `responsivefy`,
and it's used very heavily. You can check out the blog post with the corresponding
code [here](https://brendansudol.com/writing/responsive-d3).

Using D3 with React is a little tricky though (on account of the virtual DOM),
so I created this simple component to mimic the `responsivefy` function.

## API

### Component Props

| Name     | Prop Type   | Required? |
|----------|-------------|-----------|
| `height` | number      | Yes       |
| `width`  | number      | Yes       |
| `margin` | **See below** | No        |

### Props for `margin`

| Name     | Prop Type | Required? | Default |
|----------|-----------|-----------|---------|
| `top`    | number    | No        | 10      |
| `bottom` | number    | No        | 10      |
| `left`   | number    | No        | 10      |
| `right`  | number    | No        | 10      |


## Usage

```jsx
import React from 'react';
import * as d3 from 'd3';
import Responsivefy from 'react-responsivefy';

const data = [
  {score: 63, subject: 'Mathematics'},
  {score: 82, subject: 'Geography'},
  {score: 74, subject: 'Spelling'},
  {score: 97, subject: 'Reading'},
  {score: 52, subject: 'Science'},
  {score: 74, subject: 'Chemistry'},
  {score: 97, subject: 'Physics'},
  {score: 52, subject: 'ASL'}
];

class ResponsivefyExample extends React.Component {
  renderChart(height, width, margin) {
    const chartHeight = height - margin.top - margin.bottom;
    const chartWidth = width - margin.left - margin.right;

    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([chartHeight, 0]);
    const yAxis = d3.axisLeft(yScale);

    const xScale = d3.scaleBand()
      .padding(0.2)
      .domain(data.map(d => d.subject))
      .range([0, chartWidth]);
    const xAxis = d3.axisBottom(xScale)
      .ticks(5)
      .tickSize(10)
      .tickPadding(5);

      return (
        <g>
          <g
            ref={element => d3.select(element).call(xAxis)}
            transform={`translate(0, ${chartHeight})`}
          />
          <g ref={element => d3.select(element).call(yAxis)} />
          {data.map(record => (
            <rect
              key={record.subject}
              x={xScale(record.subject)}
              y={yScale(record.score)}
              width={xScale.bandwidth()}
              height={chartHeight - yScale(record.score)}
              fill="steelblue"
            />
          ))}
        </g>
      );
  }

  render() {
    const height = 600;
    const width = 800;
    const margin = { top: 10, right: 20, bottom: 30, left: 30 };
    return (
      <Responsivefy height={height} width={width} margin={margin}>
        {this.renderChart()}
      </Responsivefy>
    );
  }
}
```

## To Do

- Configure build
- Add tests
- Clean up README
