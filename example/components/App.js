import React from 'react';
import Responsivefy from '../../src/index';
import ExampleChart from './ExampleChart';
import Toolbar from './Toolbar';
import InfoModal from './InfoModal';

const TOOLBAR_HEIGHT = 104;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 400 - TOOLBAR_HEIGHT,
      width: 600,
      margin: { top: 10, right: 10, bottom: 10, left: 30 },
      helpModalOpen: false,
    };
  }

  handleShowHelpClick = () => {
    this.setState({ helpModalOpen: true });
  };

  handleToolbarUpdateClick = dimensions => {
    const { height, width, margin } = dimensions;
    this.setState({ height: height, width, margin });
  };

  render() {
    const { height, width, margin } = this.state;

    return (
      <div>
        <InfoModal
          open={this.state.helpModalOpen}
          onClose={() => this.setState({ helpModalOpen: false })}
        />
        <div className="container">
          <div className="columns">
            <Toolbar
              onUpdateClick={this.handleToolbarUpdateClick}
              onShowHelpClick={this.handleShowHelpClick}
            />
            <div className="column col-12">
              <div id="chart">
                <Responsivefy height={height} width={width} margin={margin}>
                  <ExampleChart
                    height={height - margin.top - margin.bottom}
                    width={width - margin.left - margin.right}
                  />
                </Responsivefy>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
