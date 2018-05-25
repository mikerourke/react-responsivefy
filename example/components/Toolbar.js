import React from 'react';

const defaultDimensions = {
  width: 600,
  height: 400,
  margin: { top: 10, right: 10, bottom: 10, left: 30 },
};

/**
 * Returns the aspect ration of the specified width and height as a string
 * separated by a colon.
 * @param {number} width Width to use in the ratio calcuation.
 * @param {number} height Height to use in the ratio calcuation.
 * @return {string}
 * @see https://gist.github.com/phobeo/793329
 */
const getAspectRatio = (width, height) => {
  const getGreatestCommonDenominator = (numerator, denominator) => {
    let modulus;
    let placeholder;

    if (denominator > numerator) {
      placeholder = numerator;
      numerator = denominator;
      denominator = placeholder;
    }

    while (denominator !== 0) {
      modulus = numerator % denominator;
      numerator = denominator;
      denominator = modulus;
    }

    return numerator;
  };

  const denominator = getGreatestCommonDenominator(width, height);
  return '' + width / denominator + ':' + height / denominator;
};

export default class Toolbar extends React.Component {
  static defaultProps = defaultDimensions;

  constructor(props) {
    super(props);
    this.state = this.getDimensionValues(this.props);
  }

  getDimensionValues = source => ({
    width: source.width,
    height: source.height,
    top: source.margin.top,
    bottom: source.margin.bottom,
    left: source.margin.left,
    right: source.margin.right,
  });

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPresses);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPresses);
  }

  handleKeyPresses = event => {
    // Either update or reset the values based on whether the Meta or Ctrl
    // key was pressed.
    const enterKeyPressed = /Enter/g.test(event.code);
    const modifierPressed = event.ctrlKey || event.metaKey;
    if (enterKeyPressed) {
      if (modifierPressed) return this.handleResetClick();
      this.handleUpdateClick();
    }
  };

  handleInputUpdate = key => event => {
    const newValue = +event.currentTarget.value;
    this.setState({ [key]: newValue });
  };

  handleResetClick = () => {
    const dimensionValues = this.getDimensionValues(defaultDimensions);
    const { height, width, top, bottom, left, right } = dimensionValues;
    this.setState(dimensionValues);
    this.props.onUpdateClick({
      height,
      width,
      margin: { top, bottom, left, right },
    });
  };

  handleUpdateClick = () => {
    const { height, width, top, bottom, left, right } = this.state;
    const margin = { top, bottom, left, right };
    this.props.onUpdateClick({ height, width, margin });
  };

  renderInputItem = inputItem => (
    <div className="column" key={inputItem.key}>
      <label
        className="form-label label-sm"
        htmlFor={inputItem.key}
        style={{ fontSize: 12 }}
      >
        {inputItem.display}
      </label>
      <input
        className="form-input input-sm"
        type="number"
        id={inputItem.key}
        step={1}
        value={this.state[inputItem.key]}
        onChange={this.handleInputUpdate(inputItem.key)}
      />
    </div>
  );

  render() {
    const inputItems = [
      { key: 'width', display: 'Width' },
      { key: 'height', display: 'Height' },
      { key: 'top', display: 'Top' },
      { key: 'bottom', display: 'Bottom' },
      { key: 'left', display: 'Left' },
      { key: 'right', display: 'Right' },
    ];

    const getFlex = (alignItems, justifyContent) => ({
      display: 'flex',
      alignItems,
      justifyContent,
    });

    return (
      <div className="column col-12" style={{ height: 104 }}>
        <div className="columns">
          <div className="column col-12">
            <div className="columns">
              <div className="column col-6">
                <h2 style={{ margin: 0, lineHeight: 'unset' }}>
                  react-responsivefy
                </h2>
              </div>
              <div
                className="column col-6"
                style={getFlex('center', 'flex-end')}
              >
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.props.onShowHelpClick}
                >
                  Need help?
                </a>
              </div>
            </div>
          </div>
          <div className="form-group column col-12">
            <div className="columns">
              {inputItems.map(inputItem => this.renderInputItem(inputItem))}
              <div className="column" style={getFlex('flex-end', 'flex-start')}>
                <button
                  className="btn btn-primary btn-sm actionButton"
                  onClick={this.handleUpdateClick}
                  style={{ marginRight: 8 }}
                >
                  Update
                </button>
                <button
                  className="btn btn-primary btn-sm actionButton"
                  onClick={this.handleResetClick}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
