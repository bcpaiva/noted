import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

/**
 * Bootstrap popup modal to display info on creating a new class
 */

class CreateClassModal extends Component {
  render() {
    return (
      <React.Fragment>
        {/** Show modal to create a new class */}
        <Modal show={true} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Class:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/** Create bootstrap form to allow for information to be entered */}
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formClassName">
                  <Form.Label>Class Name</Form.Label>
                  <Form.Control
                    type="className"
                    placeholder="Enter class name"
                  />
                  <Form.Text className="text-muted">
                    ex: Software Implementation
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} controlId="formClassID">
                  <Form.Label>Class ID</Form.Label>
                  <Form.Control type="ClassID" placeholder="Enter class ID" />
                  <Form.Text className="text-muted">ex: CIS454</Form.Text>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formClassProfessor">
                <Form.Label>Class Professor</Form.Label>
                <Form.Control
                  type="classProfessor"
                  placeholder="Enter class professor"
                />
                <Form.Text className="text-muted">
                  ex: Professor Mohan
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formClassSchool">
                <Form.Label>School</Form.Label>
                <Form.Control
                  type="classSchool"
                  placeholder="Enter school name"
                />
                <Form.Text className="text-muted">
                  ex: Syracuse University
                </Form.Text>
              </Form.Group>
            </Form>
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

export default CreateClassModal;
