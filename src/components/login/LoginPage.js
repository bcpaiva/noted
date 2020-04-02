import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import CreateAccountModal from "./login_components/CreateAccountModal";
import { withFirebase } from "../Firebase";
import Alert from "react-bootstrap/Alert";
import Login from "./login_components/Login";

class LoginPage extends Component {
  constructor() {
    super();
    this.handleCreateAccClick = this.handleCreateAccClick.bind(this);
    this.handleCreateAccClose = this.handleCreateAccClose.bind(this);
    this.handleCreateAccSuccess = this.handleCreateAccSuccess.bind(this);
  }

  state = {
    showCreateAccount: false,
    showSuccessAlert: false
  };

  // Handle create account button click
  handleCreateAccClick() {
    this.setState({
      showCreateAccount: true
    });
  }

  // Handle close create account modal
  handleCreateAccClose() {
    this.setState({
      showCreateAccount: false
    });
  }

  // Handle successful create account submit
  handleCreateAccSuccess() {
    this.setState({
      showSuccessAlert: true,
      showCreateAccount: false
    });
  }

  render() {
    return (
      <div className="container mb-5">
        {/** If account created successfully show success alert */}
        {this.state.showSuccessAlert ? (
          <Alert className="mt-5" variant="success">
            Account created successfully! Please log in below.
          </Alert>
        ) : null}
        {/** If create account button clicked, show create account modal */}
        {this.state.showCreateAccount ? (
          <CreateAccountModal
            onClose={this.handleCreateAccClose}
            onSuccess={this.handleCreateAccSuccess}
          />
        ) : null}
        {/** Login Page */}
        <Jumbotron className="mt-5 text-center">
          <h1>Welcome to Noted!</h1>
          <p>
            Before you can begin sharing, please log in or create an account
            below.
          </p>
        </Jumbotron>
        <div className="text-center h3">Login</div>
        <Login onLoginSubmit={this.props.onLogin}></Login>
        <div className="mt-5 text-center">
          <div className="mb-2">Don't have an account?</div>
          <Button onClick={this.handleCreateAccClick}>Create Account</Button>
        </div>
      </div>
    );
  }
}

export default withFirebase(LoginPage);
