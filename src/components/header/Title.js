import React, { Component } from "react";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Title extends Component {
  render() {
    return (

  <>
  <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="#home">NOTED</Navbar.Brand>
    <Nav className="mr-auto">
     <Nav.Link href="#home"></Nav.Link>
    </Nav>
<div class="btn-group open">
 <a class="btn btn-primary" href="#"><i></i>Home</a>
  <a class="btn btn-primary dropdown-toggle" data-toggle= "dropdown" href="#"><i></i>Settings</a>
  <a class="btn btn-primary" href="#"><i></i>Logout</a>
  <ul class="dropdown-menu">
    <li><a href="#"><i></i> Edit Profile</a></li>
    <li><a href="#"><i></i> Change Password</a></li>
    <li><a href="#"><i></i> Account Settings</a></li>
    <li><a href="#"><i></i> Privacy Settings</a></li>
  </ul>
</div>
  </Navbar>
  </>

);
}
}

export default Title;
