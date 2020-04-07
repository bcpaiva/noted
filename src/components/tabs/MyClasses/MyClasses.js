import React, { Component } from "react";
import ListMyClasses from "./tab_components/ListMyClasses";
import { withFirebase } from "../../Firebase";

class MyClasses extends Component {
  componentDidMount() {
    // Fetch data for current user
    this.props.firebase.fetchUserData(data => {
      let userData = data;

      // Iterate through all users until current user is found 
      for (let key in userData) {
        if (key == this.props.currentUser.uid) {

          // When user is found, set the classes array to classesIDs
          let classIdentifiers = userData[key]["classes"];
          this.props.firebase.fetchClassData(dataClass => {
            let classData = dataClass;

            // Iterate through class data to display the classes that are currently enrolled in
            for (let value in classIdentifiers) {
              var className =
                classData[classIdentifiers[value]]["data"]["class_id"];
              if (!this.state.list.indexOf(className) > -1) {

                // Set list of classes equal to the new list of classes with the new class added
                this.state.list = this.state.list.concat(className);
                const uniqueNames = Array.from(new Set(this.state.list));

                // Set the state of the list to be displayed as a table view
                this.setState({ list: uniqueNames });

                // Map the true class names to their FB identifier
                this.state.classMap[className] = this.state.classesIDs[value];
              }
            }
          });
        }
      }
    });
  }
  state = { list: [], classMap: {}, classesIDs: [] }; 

  render() {
    return (
      <div className="container text-center">
        <div className="h2">My Classes</div>
        <ListMyClasses list={this.state.list} />
      </div>
    );
  }
}

export default withFirebase(MyClasses);
