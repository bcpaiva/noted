import React, { Component } from "react"; //Import react
import profile from './profile.png'; //Import profile
import './../../../../src/myprofile.css'; //Import the css

class MyProfile extends Component {
  state = {};
  render() {
    return (	
      <div className="container">
      	<img src={profile} alt="Logo" className='profile-pic' />
      	<div className="text">
        <p>Name: Jane Doe</p>
       	<p>Username: janeDoe21</p>
       	<p>Bio: </p>
       	<p>Email: janedoe@gmail.com</p>
       	</div>
   	  </div>
    );
  }
}

export default MyProfile;
