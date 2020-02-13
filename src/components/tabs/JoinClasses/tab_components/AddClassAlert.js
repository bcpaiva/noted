import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

class AddClassAlert extends Component {
  state = {};
  render() {
    return (
      <Alert variant="success" onClose={this.props.onClose} dismissible>
        <p1>Class added successfully.</p1>
      </Alert>
    );
  }
}

export default AddClassAlert;
