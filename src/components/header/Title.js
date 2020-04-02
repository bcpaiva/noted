import React, { Component } from "react";
import { Button, NavDropdown, Navbar, Nav, NavItem } from "react-bootstrap";
import { MenuItem, DropdownMenu } from "react-bootstrap-dropdown-menu";
import LogoutItem from "./header_components/LogoutItem";

class Title extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">NOTED</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item href="profile">Edit Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <LogoutItem />
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default Title;
