import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/**
 * Bootstrap popup modal to show user more class information and allow them to add class
 */

class JoinClassModal extends Component {
  render() {
    return (
      <React.Fragment>
        {/** Show modal to confirm add class */}
        <Modal show={true} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Class:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.data ||
              "No class data available at this time." /* TODO: Pull class data from Firebase */}
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
