import React, { Component } from "react";
import { Button, NavDropdown, Navbar, Nav, NavItem } from "react-bootstrap";
import LogoutItem from "./LogoutItem";
import { withFirebase } from "../../Firebase";

class ProfileDropdown extends Component {
  state = {
    firstName: null,
  };

  componentWillMount() {
    this.props.firebase.fetchSingleUserData(
      this.props.currentUser.uid,
      (data) => {
        this.setState({
          firstName: data.first_name,
        });
      }
    );
  }

  render() {
    if (!this.state.firstName) {
      return <div />;
    }
    return (
      <NavDropdown title={this.state.firstName} id="basic-nav-dropdown">
        <LogoutItem />
      </NavDropdown>
    );
  }
}

export default withFirebase(ProfileDropdown);
