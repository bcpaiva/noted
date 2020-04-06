import React, { Component } from "react";
import { NavDropdown } from "react-bootstrap";
import { withFirebase } from "../../Firebase";
import LogoutItem from "./LogoutItem";

class LoginHeader extends Component {
  constructor() {
    super();
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  state = {};


  componentWillMount() {
    this.props.firebase.fetchSingleUserData(this.props.currentUser.uid,
      (data)=>{this.setState({name:data.first_name})});
  }

  render() {
    if (!this.state.name) {
      return <div />
    }
    return (
      <div >
      <NavDropdown title={"Hi, " + this.state.name + "!"} id="basic-nav-dropdown">
      <LogoutItem />
      </NavDropdown>
       </div>
    );
  }
}

export default withFirebase(LoginHeader);
