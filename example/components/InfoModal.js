import React from 'react';

// TODO: Finish this!
export default class InfoModal extends React.Component {
  render() {
    const { open } = this.props;
    return (
      <div className={`modal ${open ? 'active' : ''}`} id="info-modal">
        <a className="modal-overlay" aria-label="Close" />
        <div className="modal-container" role="document">
          <div className="modal-header">
            <button
              className="btn btn-clear float-right"
              onClick={this.props.onClose}
            />
            <div className="modal-title h1">Demo Help</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <h4>Functionality</h4>
              <p>To see react-responsivefy in action, resize the window.</p>
              <h4>Changing Chart Dimensions</h4>
              <p>
                Try changing the width, height, or margin values and either
                pressing <kbd>Enter</kbd> or hitting the <b>Update</b> button.
              </p>
              <p>
                Hitting the <b>Reset</b> button or using the{' '}
                <kbd>Cmd/Ctrl + Enter</kbd> keyboard shortcut resets the values
                to their defaults.
              </p>
              <h4>Notes/Known Issues</h4>
              <ul style={{ textIndent: '-1.4em' }}>
                <li>
                  If you change the chart dimensions and press the <b>Update</b>{' '}
                  key, you'll still need to resize the window to see your
                  changes, this is due to the D3 chart acting wonky with React.
                  This shouldn't affect you in production, it's due to the way
                  I'm using D3 with React.
                </li>
                <li>
                  Depending on the height and width you choose, the bottom of
                  the chart stretch beyond the bottom of the window when you
                  resize. That's because the dimensions are calculated based on
                  the aspect ratio.
                </li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}
