import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

// Simple bootstrap alert module to let user know that class was added successfully.
class JoinClassAlert extends Component {
  state = {};
  render() {
    return (
      <Alert variant="success" onClose={this.props.onClose} dismissible>
        <p1>Class added successfully.</p1>
      </Alert>
    );
  }
}

export default JoinClassAlert;
