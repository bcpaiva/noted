import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import LoginHeader from "./header_components/LoginHeader";

class Title extends Component {


  render() {
    if (this.props.loggedIn && !this.props.currentUser){
      return <div />;
    }
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">NOTED</Navbar.Brand>
        <Nav className="mr-auto">
        {this.props.loggedIn ?  (
      <React.Fragment >
          <LoginHeader currentUser={this.props.currentUser}/>
      </React.Fragment >
        ): null}
        </Nav>
      </Navbar>
    );
  }
}

export default Title;
