import React, { Component } from "react";
import ListMyClasses from "./tab_components/ListMyClasses";
import { withFirebase } from "../../Firebase";

class MyClasses extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    classList: null, //Where list of user's classes will be stored
    uid: this.props.currentUser.uid, // Current user's uid
  };

  componentDidMount() {
    // Fetch data for current user
    this.props.firebase.fetchSingleUserData(this.state.uid, (userData) => {
      // Store user's classes
      let userClasses = userData.classes;
      // If they are enrolled in any classes,
      if (userClasses) {
        // fetch all class data from firebase
        this.props.firebase.fetchClassData((classData) => {
          let classList = [];
          // For each class,
          for (let classKey in classData) {
            // If user is in class,
            if (userClasses.includes(classKey)) {
              classList.push(classData[classKey]["data"]["class_id"]);
            }
          }
          this.setState({
            classList: classList,
          });
        });
        // If they aren't in any classes, return empty array
      } else {
        this.setState({
          classList: [],
        });
      }
    });
  }

  render() {
    // Wait for classes to come from firebase
    if (!this.state.classList) {
      return <div />;
    }

    return (
      <div className="container text-center">
        <div className="h2">My Classes</div>
        <ListMyClasses
          currentUser={this.props.currentUser}
          classList={this.state.classList}
        />
      </div>
    );
  }
}

export default withFirebase(MyClasses);
