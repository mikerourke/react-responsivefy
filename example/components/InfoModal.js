import React from 'react';

export default class InfoModal extends React.Component {
  render() {
    const { open } = this.props;
    return (
      <div className={`modal ${open ? 'active' : ''}`} id="info-modal">
        <button className="modal-overlay" aria-label="Close" />
        <div className="modal-container" role="document">
          <div className="modal-header">
            <button className="btn btn-clear float-right" aria-label="Close" onClick={this.props.onClose}/>
            <div className="modal-title h5">Modal title</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <p>This is the content inside the modal.</p>
              <h4>Lorem ipsum</h4>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={this.props.onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}
