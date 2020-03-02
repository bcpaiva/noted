import React, { Component } from "react"; //Import react
import profile from './profile.png'; //Import profile

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
        <div className="container text-center">
          {/* Edit Profile Header */}
          <div className="row pb-2">
            <div className="col"></div>
            <div className="col-6 h2">My Profile</div>
            <div className="col"></div>
          </div>
          {/* Edit Profile Name */}
          <form>
          <div className="row pb-2">
            <div className="col-6 p">Username: {this.state.username}</div>
            <input
              type='text'
              name='username'
              onChange={this.myChangeHandler}
              />
          </div>
          <div className="row pb-2">
            <div className="col-6 p">Email: {this.state.email}</div>
            <input
              type='text'
              name='email'
              onChange={this.myChangeHandler}
            />
          </div>
          <div className="row pb-2">
            <div className="col-6 p">Password: {this.state.password}</div>
            <input
              type='text'
              name='password'
              onChange={this.myChangeHandler}
            />
          </div>
          <div className="row pb-2">
            <div className="col-6 p">Age: {this.state.age}</div>
            <input
              type='text'
              name='age'
              onChange={this.myChangeHandler}
            />
          </div>
          <div className="row pb-2">
            <div className="col-6 p">School: {this.state.school}</div>
            <input
              type='text'
              name='school'
              onChange={this.myChangeHandler}
            />
          </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default MyProfile;
