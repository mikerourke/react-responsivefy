/**
 * The data and chart code for this component was taken from a lesson in the
 * Build Interactive JavaScript Charts with D3 v4 course on egghead.io.
 * @see https://egghead.io/courses/build-interactive-javascript-charts-with-d3-v4
 */
import React from 'react';
import * as d3 from 'd3';

const data = [
  {
    ticker: 'AMZN',
    values: [
      { date: '2016/09/30', close: 837.31 },
      { date: '2016/09/29', close: 829.05 },
      { date: '2016/09/28', close: 828.72 },
      { date: '2016/09/27', close: 816.11 },
      { date: '2016/09/26', close: 799.16 },
      { date: '2016/09/23', close: 805.75 },
      { date: '2016/09/22', close: 804.7 },
      { date: '2016/09/21', close: 789.74 },
      { date: '2016/09/20', close: 780.22 },
      { date: '2016/09/19', close: 775.1 },
      { date: '2016/09/16', close: 778.52 },
      { date: '2016/09/15', close: 769.69 },
      { date: '2016/09/14', close: 761.09 },
      { date: '2016/09/13', close: 761.01 },
      { date: '2016/09/12', close: 771.49 },
      { date: '2016/09/09', close: 760.14 },
      { date: '2016/09/08', close: 784.06 },
      { date: '2016/09/07', close: 784.48 },
      { date: '2016/09/06', close: 788.87 },
      { date: '2016/09/02', close: 772.44 },
      { date: '2016/09/01', close: 770.62 },
      { date: '2016/08/31', close: 769.16 },
      { date: '2016/08/30', close: 767.58 },
      { date: '2016/08/29', close: 771.29 },
      { date: '2016/08/26', close: 769 },
      { date: '2016/08/25', close: 759.22 },
      { date: '2016/08/24', close: 757.25 },
      { date: '2016/08/23', close: 762.45 },
      { date: '2016/08/22', close: 759.48 },
      { date: '2016/08/19', close: 757.31 },
      { date: '2016/08/18', close: 764.46 },
      { date: '2016/08/17', close: 764.63 },
      { date: '2016/08/16', close: 764.04 },
      { date: '2016/08/15', close: 768.49 },
      { date: '2016/08/12', close: 772.56 },
      { date: '2016/08/11', close: 771.24 },
      { date: '2016/08/10', close: 768.56 },
      { date: '2016/08/09', close: 768.31 },
      { date: '2016/08/08', close: 766.56 },
      { date: '2016/08/05', close: 765.98 },
      { date: '2016/08/04', close: 760.77 },
      { date: '2016/08/03', close: 754.64 },
      { date: '2016/08/02', close: 760.58 },
      { date: '2016/08/01', close: 767.74 },
      { date: '2016/07/29', close: 758.81 },
      { date: '2016/07/28', close: 752.61 },
      { date: '2016/07/27', close: 736.67 },
      { date: '2016/07/26', close: 735.59 },
      { date: '2016/07/25', close: 739.61 },
      { date: '2016/07/22', close: 744.86 },
      { date: '2016/07/21', close: 744.43 },
      { date: '2016/07/20', close: 745.72 },
      { date: '2016/07/19', close: 739.95 },
      { date: '2016/07/18', close: 736.07 },
      { date: '2016/07/15', close: 735.44 },
      { date: '2016/07/14', close: 741.2 },
      { date: '2016/07/13', close: 742.63 },
      { date: '2016/07/12', close: 748.21 },
      { date: '2016/07/11', close: 753.78 },
      { date: '2016/07/08', close: 745.81 },
      { date: '2016/07/07', close: 736.57 },
      { date: '2016/07/06', close: 737.61 },
      { date: '2016/07/05', close: 728.1 },
      { date: '2016/07/01', close: 725.68 },
    ],
  },
  {
    ticker: 'GOOG',
    values: [
      { date: '2016/09/30', close: 777.29 },
      { date: '2016/09/29', close: 775.01 },
      { date: '2016/09/28', close: 781.56 },
      { date: '2016/09/27', close: 783.01 },
      { date: '2016/09/26', close: 774.21 },
      { date: '2016/09/23', close: 786.9 },
      { date: '2016/09/22', close: 787.21 },
      { date: '2016/09/21', close: 776.22 },
      { date: '2016/09/20', close: 771.41 },
      { date: '2016/09/19', close: 765.7 },
      { date: '2016/09/16', close: 768.88 },
      { date: '2016/09/15', close: 771.76 },
      { date: '2016/09/14', close: 762.49 },
      { date: '2016/09/13', close: 759.69 },
      { date: '2016/09/12', close: 769.02 },
      { date: '2016/09/09', close: 759.66 },
      { date: '2016/09/08', close: 775.32 },
      { date: '2016/09/07', close: 780.35 },
      { date: '2016/09/06', close: 780.08 },
      { date: '2016/09/02', close: 771.46 },
      { date: '2016/09/01', close: 768.78 },
      { date: '2016/08/31', close: 767.05 },
      { date: '2016/08/30', close: 769.09 },
      { date: '2016/08/29', close: 772.15 },
      { date: '2016/08/26', close: 769.54 },
      { date: '2016/08/25', close: 769.41 },
      { date: '2016/08/24', close: 769.64 },
      { date: '2016/08/23', close: 772.08 },
      { date: '2016/08/22', close: 772.15 },
      { date: '2016/08/19', close: 775.42 },
      { date: '2016/08/18', close: 777.5 },
      { date: '2016/08/17', close: 779.91 },
      { date: '2016/08/16', close: 777.14 },
      { date: '2016/08/15', close: 782.44 },
      { date: '2016/08/12', close: 783.22 },
      { date: '2016/08/11', close: 784.85 },
      { date: '2016/08/10', close: 784.68 },
      { date: '2016/08/09', close: 784.26 },
      { date: '2016/08/08', close: 781.76 },
      { date: '2016/08/05', close: 782.22 },
      { date: '2016/08/04', close: 771.61 },
      { date: '2016/08/03', close: 773.18 },
      { date: '2016/08/02', close: 771.07 },
      { date: '2016/08/01', close: 772.88 },
      { date: '2016/07/29', close: 768.79 },
      { date: '2016/07/28', close: 745.91 },
      { date: '2016/07/27', close: 741.77 },
      { date: '2016/07/26', close: 738.42 },
      { date: '2016/07/25', close: 739.77 },
      { date: '2016/07/22', close: 742.74 },
      { date: '2016/07/21', close: 738.63 },
      { date: '2016/07/20', close: 741.19 },
      { date: '2016/07/19', close: 736.96 },
      { date: '2016/07/18', close: 733.78 },
      { date: '2016/07/15', close: 719.85 },
      { date: '2016/07/14', close: 720.95 },
      { date: '2016/07/13', close: 716.98 },
      { date: '2016/07/12', close: 720.64 },
      { date: '2016/07/11', close: 715.09 },
      { date: '2016/07/08', close: 705.63 },
      { date: '2016/07/07', close: 695.36 },
      { date: '2016/07/06', close: 697.77 },
      { date: '2016/07/05', close: 694.49 },
      { date: '2016/07/01', close: 699.21 },
    ],
  },
];

export default class ExampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validData: this.getValidData(),
    };
  }

  componentDidMount() {
    setTimeout(() => this.renderChart(), 0);
  }

  componentDidUpdate() {
    setTimeout(() => this.renderChart(), 0);
  }

  /**
   * Returns data with time parsed and numerical close values to ensure data
   * is valid prior to charting.
   */
  getValidData = () => {
    const parseTime = d3.timeParse('%Y/%m/%d');

    return data.map(({ ticker, values }) => {
      const updatedValues = values.map(d => ({
        date: parseTime(d.date),
        close: +d.close,
      }));

      return {
        ticker,
        values: updatedValues,
      };
    });
  };

  renderChart = () => {
    const { height, width } = this.props;

    const wrapper = d3.select(this.ref.parentNode);
    wrapper.selectAll('*').remove();

    const xScale = d3
      .scaleTime()
      .domain([new Date(2016, 6, 1), new Date(2016, 8, 30)])
      .range([0, width]);

    wrapper
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(5));

    const yScale = d3
      .scaleLinear()
      .domain([695, 838])
      .range([height, 0]);

    wrapper.append('g').call(d3.axisLeft(yScale));

    const line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close));

    wrapper
      .selectAll('.line')
      .data(this.state.validData)
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => ['#FF9900', '#3369e8'][i])
      .style('stroke-width', 2)
      .style('fill', 'none');
  };

  handleRef = element => (this.ref = element);

  render() {
    return <g ref={this.handleRef} />;
  }
}
