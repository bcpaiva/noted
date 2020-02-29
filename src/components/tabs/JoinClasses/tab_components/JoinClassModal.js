import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/**
 * Bootstrap popup modal to show user more class information and allow them to add class
 * PROPS:
 *  onClick: click handle function
 *  onAdd: add handle function
 *  data: data object representing class information
 */

class JoinClassModal extends Component {
  renderClassInfo() {
    //If no data received, return false
    if (!this.props.data) {
      return false;
    }
    return Object.keys(this.props.data).map(dataKey => {
      return (
        <React.Fragment>
          <h3>{dataKey + ":"}</h3>
          <p>{this.props.data[dataKey]}</p>
        </React.Fragment>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        {/** Show modal to confirm add class */}
        <Modal show={true} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Class:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/** Render class data in modal */}
            {Object.keys(this.props.data).map(dataKey => {
              return (
                <React.Fragment>
                  <h6>{dataKey + ":"}</h6>
                  <p>{this.props.data[dataKey]}</p>
                </React.Fragment>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            {/** Create cancel and "add class" buttons at bottom of modal */}
            <Button variant="secondary" onClick={this.props.onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.props.onAdd}>
              Add Class
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default JoinClassModal;
