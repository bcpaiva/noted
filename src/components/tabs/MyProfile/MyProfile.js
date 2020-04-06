import React, { Component } from "react"; //Import react
import Button from "react-bootstrap/Button"; //Import button
import { withFirebase } from "../../Firebase"; //Import Firebase
import Modal from "react-bootstrap/Modal"; //Import modal
import Form from "react-bootstrap/Form"; //Import form
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";

const INITIAL_STATE = {
  email: "", // email form field
  password: "", // password form field
  confirmPassword: "", // confirm password form field
  username: "", // username form field
  users: null, // user data from firebase
  error: null // error log
};

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this); 
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  state = { ...INITIAL_STATE };

  componentWillMount() { //Fetch user data 
    this.props.firebase.fetchSingleUserData(this.props.currentUser.uid,(data)=>
      {this.setState({name:data.first_name})});
    this.props.firebase.fetchSingleUserData(this.props.currentUser.uid,(data)=>
      {this.setState({lastname:data.last_name})});
    this.props.firebase.fetchSingleUserData(this.props.currentUser.uid,(data)=>
      {this.setState({username:data.username})});
    this.props.firebase.fetchSingleUserData(this.props.currentUser.uid,(data)=>
      {this.setState({email:data.email})});
    this.props.firebase.fetchSingleUserData(this.props.currentUser.uid,(data)=>
      {this.setState({password:data.password})});
  }

  handleValidation() {
  // Check if password and confirm password match
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: { message: "Passwords do not match" }
      });
      return false;
    }

    // Check if username is already in use
    let inUse = false;

    for (let userId in this.state.users) {
      if (this.state.users[userId]["username"] === this.state.username) {
        this.setState({
          error: { message: "Username is taken" }
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
      [e.target.name]: e.target.value
    });
  }

    // Handle create account form submit
  handleSubmit(e) {
    e.preventDefault();

    // If validated, also validate with firebase authentication
    let validated = this.handleValidation();
    if (validated) {
      this.props.firebase
        .then(authUser => {
          // If user is authenticated, add extra user data to firebase
          this.props.firebase.ChangeUserData(authUser.user.uid, {
            username: this.state.username, // Username
            password: this.state.password
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
    //Wait for data to be loaded in 
    if (!this.state.users) {
      return <div />;
    }

    if (!this.state.name) {
      return <div />
    }

    if (!this.state.lastname) {
      return <div />
    }

    if (!this.state.username) {
      return <div />
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
           <Button variant="primary" onClick={() => this.setState({showUsernameModal: true})}>Change Username</Button>{'    '}
           <Button variant="primary" onClick={() => this.setState({showPasswordModal: true})}>Change Password</Button>{'    '}
        </div>
        {/* Change username modal */}
        <Modal show={this.state.showUsernameModal} onHide={this.props.onClose}>
        <Form id="changeUsername" onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Change Username</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="username">
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
              <Button variant="secondary" onClick={this.props.onClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Modal.Body>
          </Form>
        </Modal>

      {/* Change password modal */}
        <Modal show={this.state.showPasswordModal} onHide={this.props.onClose}>
        <Form id="changeUsername" onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form.Group controlId="confirmPassword">
                <Form.Label>Please enter your old password</Form.Label>
                <Form.Control
                    name="confirmPassword"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Old Password"
                  />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Type new password here:</Form.Label>
                <Form.Control
                    name="password"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="New Password"
                  />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.onClose}>
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
