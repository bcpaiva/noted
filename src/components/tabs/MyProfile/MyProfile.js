import React, { Component } from "react"; //Import react
import profile from './profile.png'; //Import profile
import Button from "react-bootstrap/Button"; //Import Button
import Form from "react-bootstrap/Form";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      age: null,
      school: '',
    };
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }
  render() {
    return (	
      <React.Fragment>
        <div className="container">
        <div className="h2 text-center">Create an Account</div>
        <Form>
          <Form.Row>
          <Form.Group controlId="formBasicEmail" className="col-md-5">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group controlId="formBasicPassword" className="col-md-5">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Form.Text className="text-muted">
               We'll never share your password with anyone else.
            </Form.Text>
          </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group controlId="formBasicSchool" className="col-md-4">
            <Form.Label>School or University</Form.Label>
            <Form.Control type="school" placeholder="School" />
          </Form.Group>

          <Form.Group controlId="formBasicAge" className="col-md-4">
            <Form.Label>Age</Form.Label>
            <Form.Control type="age" placeholder="Age" />
          </Form.Group>
          </Form.Row>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </div>
      </React.Fragment>
    );
  }
}

export default MyProfile;
