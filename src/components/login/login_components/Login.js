import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { withFirebase } from "../../Firebase";

const INITIAL_STATE = {
  email: "", // Email form field
  password: "", // Password form field
  error: null // Error log
};

class Login extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    ...INITIAL_STATE
  };

  // Handle login submit
  onSubmit(e) {
    e.preventDefault();
    this.props.firebase
      .doSignInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({ ...INITIAL_STATE }); // Reset states for data integrity
        this.props.onLoginSubmit();
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  // Handle form value change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    // is invalid if email and password fields are empty
    const isInvalid = this.state.email === "" || this.state.password === "";
    return (
      <div class="row">
        <div class="col" />
        <div class="col-5">
          <Form onSubmit={this.onSubmit}>
            {/** Show error if error log is not empty */}
            {this.state.error && (
              <Alert variant="danger">{this.state.error.message}</Alert>
            )}
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                onChange={this.onChange}
                type="email"
                placeholder="Enter email (ending in @syr.edu)"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                onChange={this.onChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isInvalid}>
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
