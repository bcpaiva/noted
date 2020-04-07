import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

/**
 * Modal to allow user to confirm if they want to remove a class
 */
class RemoveClassModal extends Component {
  render() {
    // Render Class Deletion confirmation Modal
    return (
      <Modal show={true} onHide={this.props.onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Class Confirmation:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to remove {this.props.classId} from your
            classes?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.props.onConfirm}>
            Remove Class
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RemoveClassModal;
