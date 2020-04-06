import React, { Component } from "react";
import ListMyClasses from "./tab_components/ListMyClasses";
import { withFirebase } from "../../Firebase";

class MyClasses extends Component {
  componentDidMount() {
    // Fetch data for current user
    this.props.firebase.fetchUserData(data => {
      let userData = data;
      for (let key in userData) {
        if (key == this.props.currentUser.uid) {
          // When user is found, set the classes array to classesIDs
          let classIdentifiers = userData[key]["classes"];
          this.props.firebase.fetchClassData(dataClass => {
            let classData = dataClass;
            for (let value in classIdentifiers) {
              var className =
                classData[classIdentifiers[value]]["data"]["class_id"];
              if (!this.state.list.indexOf(className) > -1) {
                // this.setState({list: this.state.list.concat(className)})
                this.state.list = this.state.list.concat(className);
                const uniqueNames = Array.from(new Set(this.state.list));
                console.log("UNIQUE NAMES", uniqueNames);
                this.setState({ list: uniqueNames });
                this.state.classMap[className] = this.state.classesIDs[value];
              }
            }
          });
        }
      }
    });
  }
  state = { list: [], classMap: {}, classesIDs: [] }; // List of classes

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
