import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import CreateAccountModal from "./CreateAccountModal";

class LoginPage extends Component {
  constructor() {
    super();
    this.handleCreateAccClick = this.handleCreateAccClick.bind(this);
    this.handleCreateAccClose = this.handleCreateAccClose.bind(this);
  }

  state = {
    createAccount: false
  };

  handleCreateAccClick() {
    this.setState({
      createAccount: true
    });
  }

  handleCreateAccClose() {
    this.setState({
      createAccount: false
    });
  }

  //TODO
  handleCreateAcc(e) {
    console.log(e);
  }

  render() {
    return (
      <div className="container mb-5">
        {this.state.createAccount ? (
          <CreateAccountModal
            onCreate={this.handleCreateAcc}
            onClose={this.handleCreateAccClose}
          />
        ) : null}
        <Jumbotron className="mt-5 text-center">
          <h1>Welcome to Noted!</h1>
          <p>
            Before you can begin sharing, please log in or create an account
            below.
          </p>
        </Jumbotron>
        <div className="text-center h3">Login</div>
        <div class="row">
          <div class="col" />
          <div class="col-5">
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email (ending in @syr.edu)"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="login">
                Login
              </Button>
            </Form>
          </div>
          <div class="col" />
        </div>
        <div className="mt-5 text-center">
          <div className="mb-2">Don't have an account?</div>
          <Button onClick={this.handleCreateAccClick}>Create Account</Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
