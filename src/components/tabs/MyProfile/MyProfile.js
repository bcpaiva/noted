import React, { Component } from "react"; //Import react
import Button from "react-bootstrap/Button"; //Import button
import { withFirebase } from "../../Firebase"; //Import Firebase
import Modal from "react-bootstrap/Modal"; //Import modal
import Form from "react-bootstrap/Form"; //Import form
import InputGroup from "react-bootstrap/InputGroup"; //Import InputGroup

const INITIAL_STATE = {
  email: "", // email form field
  newPassword: "", // password form field
  confirmPassword: "", // confirm password form field
  username: "", // username form field
  users: null, // user data from firebase
  error: null, // error log
};

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUsernameValidation = this.handleUsernameValidation.bind(this);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
  }

  state = { ...INITIAL_STATE };

  componentWillMount() {
    //Fetch user data
    this.props.firebase.fetchSingleUserData(
      this.props.currentUser.uid,
      (data) => {
        this.setState({
          name: data.first_name,
          lastname: data.last_name,
          username: data.username,
        });
      }
    );
  }

  /*
  handlePasswordValidation() {
    // Check if password and confirm password match
    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({
        error: { message: "Passwords do not match" }
      });
      return false;
    }

  }
  */

  handleUsernameValidation() {
    // Check if username is already in use
    let inUse = false;

    for (let userId in this.state.users) {
      if (this.state.users[userId]["username"] === this.state.username) {
        this.setState({
          error: { message: "Username is taken" },
        });
        inUse = true;
      }
    }

    // If it's in use, return false for validation
    if (inUse) {
      return false;
    }

    // If no errors in form, return true
    return true;
  }

  // Handle form value changes
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // Handle create account form submit
  handleUsernameSubmit() {
    // If validated, also validate with firebase authentication
    let validated = this.handleUsernameValidation();
    console.log(this.props.currentUser.uid);
    if (validated) {
      console.log(this.state.username);
      this.props.firebase.setUsername(
        this.props.currentUser.uid,
        this.state.username,
        () => {
          /* callback function */
          this.setState({
            ...INITIAL_STATE,
          }); /* Reset states for data integrity */
          this.props.onSuccess();
        }
      );
    }
  }

  render() {
    //Wait for data to be loaded in
    if (
      !this.props.currentUser ||
      !this.state.name ||
      !this.state.lastname ||
      !this.state.username
    ) {
      //Makes it not render
      return <div />;
    }

    return (
      <React.Fragment>
        <div className="container text-center">
          {/* Edit Profile Header */}
          <div className="row pb-2">
            <div className="col"></div>
            <div className="col-6 h2">My Profile</div>
            <div className="col"></div>
          </div>
          {/* Edit Profile Name */}
          <div className="row pb-2">
            <div className="col-6 p">First Name: {this.state.name}</div>
          </div>
          <div className="row pb-2">
            <div className="col-6 p">Last Name: {this.state.lastname}</div>
          </div>
          <div className="row pb-2">
            <div className="col-6 p">Username: {this.state.username}</div>
          </div>
          <Button
            variant="primary"
            onClick={() => this.setState({ showUsernameModal: true })}
          >
            Change Username
          </Button>
          {"    "}
          <Button
            variant="primary"
            onClick={() => this.setState({ showPasswordModal: true })}
          >
            Change Password
          </Button>
          {"    "}
        </div>
        {/* Change username modal */}
        <Modal
          show={this.state.showUsernameModal}
          onHide={() => this.setState({ showUsernameModal: false })}
        >
          <Form id="changeUsername">
            <Modal.Header closeButton>
              <Modal.Title>Change Username</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="newUsername">
                <Form.Label>Type your new username:</Form.Label>
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
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ showUsernameModal: false })}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={this.handleUsernameSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Form>
        </Modal>

        {/* Change password modal */}
        <Modal
          show={this.state.showPasswordModal}
          onClick={() => this.setState({ showPasswordModal: false })}
        >
          <Form id="changeUsername" onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="newPassword">
                <Form.Label>Please enter a new password</Form.Label>
                <Form.Control
                  name="newPassword"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="New Password"
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Please re-enter your new password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Confirm Password"
                />
              </Form.Group>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ showPasswordModal: false })}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withFirebase(MyProfile);
