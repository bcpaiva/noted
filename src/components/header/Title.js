import React, { Component } from 'react';
import { Button, NavDropdown, Navbar, Nav, NavItem } from 'react-bootstrap';
import { MenuItem, DropdownMenu } from 'react-bootstrap-dropdown-menu';

class Title extends Component {

  render() {
    return (
      <>
      <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">NOTED</Navbar.Brand>
    <Nav className="mr-auto">
     <Nav.Link href="#home">Home</Nav.Link>
    <NavDropdown title="Settings" id="basic-nav-dropdown">
        <NavDropdown.Item href="profile">Edit Profile</NavDropdown.Item>
        <NavDropdown.Item href="profile">Change Password</NavDropdown.Item>
        <NavDropdown.Item href="profile">Account Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="profile">Logout</NavDropdown.Item>
      </NavDropdown>
</Nav>
  </Navbar>
  </>

);
}
}


export default Title;
