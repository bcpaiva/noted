import React, { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { withFirebase } from "../../Firebase";

class LogoutItem extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {};

  // Logout using firebase and set loggedIn state to false on successful logout
  handleLogout() {
    this.props.firebase.doSignOut();
  }

  render() {
    return (
      <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
    );
  }
}

export default withFirebase(LogoutItem);
