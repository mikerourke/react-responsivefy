import React from 'react';
import PropTypes from 'prop-types';

export default class Responsivefy extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    margin: PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  };

  constructor(props) {
    super(props);
    const { width, height } = this.props;
    this.aspect = +width / +height;
    this.state = {
      currentWidth: +width,
      currentHeight: +height,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const widthInPixels = window
      .getComputedStyle(this.ref.parentNode, null)
      .getPropertyValue('width');
    if (!widthInPixels) return;

    let updatedWidth = parseInt(widthInPixels, 10);
    let updatedHeight = Math.round(updatedWidth / this.aspect);

    const windowHeight = window.innerHeight;
    if (updatedHeight >= windowHeight) {
      updatedHeight = windowHeight;
      updatedWidth = Math.round(updatedHeight * this.aspect);
    }

    this.setState({ currentWidth: updatedWidth, currentHeight: updatedHeight });
  };

  handleRef = element => (this.ref = element);

  render() {
    const { height, width, margin } = this.props;
    const { left, right, top, bottom } = margin;
    const fullHeight = +height + +top + +bottom;
    const fullWidth = +width + +left + +right;

    return (
      <svg
        width={this.state.currentWidth}
        height={this.state.currentHeight}
        viewBox={`0 0 ${fullWidth} ${fullHeight}`}
        preserveAspectRatio="xMinYMid"
        ref={this.handleRef}
      >
        <g transform={`translate(${+left}, ${+top})`}>{this.props.children}</g>
      </svg>
    );
  }
}
