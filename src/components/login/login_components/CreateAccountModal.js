import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { withFirebase } from "../../Firebase";
import Alert from "react-bootstrap/Alert";

const INITIAL_STATE = {
  firstName: "", // first name form field
  lastName: "", // last name form field
  email: "", // email form field
  password: "", // password form field
  confirmPassword: "", // confirm password form field
  username: "", // username form field
  users: null, // user data from firebase
  error: null // error log
};

class CreateAccountModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  state = { ...INITIAL_STATE };

  // Fetch user data for username verification
  componentWillMount() {
    this.props.firebase.fetchUserData(userData => {
      this.setState({
        users: userData
      });
    });
  }

  // Handle form value changes
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Ensure proper format of form. If not, add error message
  handleValidation() {
    // Check if first name is only letters
    if (!/^[a-z]+$/i.test(this.state.firstName)) {
      this.setState({
        error: {
          message: "First name can't contain special characters or numbers"
        }
      });
      return false;
    }
    // Check if last name is only letters
    if (!/^[a-z]+$/i.test(this.state.lastName)) {
      this.setState({
        error: {
          message: "Last name can't contain special characters or numbers"
        }
      });
      return false;
    }
    // Check if email is @syr.edu email
    if (!this.state.email.includes("@syr.edu")) {
      this.setState({
        error: { message: "Email must be @syr.edu email" }
      });
      return false;
    }
    // Check if password and confirm password match
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: { message: "Passwords do not match" }
      });
      return false;
    }
    // Check if username is already in use
    let inUse = false;
    Object.keys(this.state.users).map(userId => {
      if (this.state.users[userId]["username"] === this.state.username) {
        this.setState({
          error: { message: "Username is taken" }
        });
        inUse = true;
      }
    });
    // If it's in use, return false for validation
    if (inUse) {
      return false;
    }

    // If no errors in form, return true
    return true;
  }

  // Handle create account form submit
  handleSubmit(e) {
    e.preventDefault();

    // If validated, also validate with firebase authentication
    let validated = this.handleValidation();
    if (validated) {
      this.props.firebase
        .doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(authUser => {
          // If user is authenticated, add extra user data to firebase
          this.props.firebase.addUserData(authUser.user.uid, {
            username: this.state.username, // Username
            first_name: this.state.firstName, // First name
            last_name: this.state.lastName // Last name
          });
          this.setState({ ...INITIAL_STATE }); // Reset states for data integrity
          this.props.onSuccess();
        })
        .catch(error => {
          // If error, add to error state
          this.setState({ error });
        });
    }
  }

  render() {
    // Check if form is fully filled in
    const isInvalid =
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.password === "" ||
      this.state.email === "" ||
      this.state.username === "";

    // Wait for user data to get fetched from firebase
    if (!this.state.users) {
      return <div />;
    }

    return (
      <Modal show={true} onHide={this.props.onClose}>
        {/** Create Account Modal */}
        <Form id="createAccount" onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Create Account:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/** Show error if error log is not empty */}
            {this.state.error && (
              <Alert variant="danger">{this.state.error.message}</Alert>
            )}
            <small className="mb-4">{"* = required field"}</small>
            <Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    name="firstName"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="First name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    name="lastName"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Last name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="email">
              <Form.Label>Email address *</Form.Label>
              <Form.Control
                name="email"
                onChange={this.handleChange}
                type="email"
                placeholder="Enter email (ending in @syr.edu)"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                name="password"
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                name="confirmPassword"
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username *</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="username"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Username"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onClose}>
              Cancel
            </Button>
            <Button disabled={isInvalid} variant="primary" type="submit">
              Create Account
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default withFirebase(CreateAccountModal);
