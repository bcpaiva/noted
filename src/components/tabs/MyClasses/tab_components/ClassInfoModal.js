import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class ClassInfoModal extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Modal show={true} onHide={this.props.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Class Information:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.data ||
              "No class data available at this time." /* TODO: Pull class data from Firebase */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.props.onAdd}>
              View Lecture Notes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ClassInfoModal;
