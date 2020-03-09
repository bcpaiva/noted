import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Login extends Component {
  state = {};
  render() {
    return (
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
    );
  }
}

export default withFirebase(Login);
