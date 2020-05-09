import React from "react";
import UploadClassList from "./UploadClassList.js";
import { withFirebase } from "../../Firebase";
class UploadNotes extends React.Component {
  state = {
    classes: [],
    classesIDs: [],
    classMap: {},
  };

  componentDidMount() {
    // Fetch data for current user

    this.props.firebase.fetchUserData((data) => {
      let userData = data;
      for (let key in userData) {
        if (key === this.props.currentUser.uid) {
          // When user is found, set the classes array to classesIDs

          let classIdentifiers = userData[key]["classes"];
          this.props.firebase.fetchClassData((dataClass) => {
            let classData = dataClass;

            // Iterate through all class identifiers to display the correct class name in the list
            for (let value in classIdentifiers) {
              var className =
                classData[classIdentifiers[value]]["data"]["class_id"];
              if (!this.state.classes.indexOf(className) > -1) {
                //Add correct class name to array
                this.setState({
                  classes: this.state.classes.concat(className),
                });

                // Remove any duplicates from array
                const uniqueNames = Array.from(new Set(this.state.classes));

                // Set state of unique class names to return as a table view
                this.setState({ classes: uniqueNames });

                // Map the FB identifier to the true class name
                let classMap = this.state.classMap;
                classMap[className] = classIdentifiers[value];
                this.setState({
                  classMap: classMap,
                });
              }
            }
          });
        }
      }
    });
  }

  render() {
    if (!this.state.classes) {
      return <React.Fragment />;
    }
    return (
      <div className="container text-center">
        <div className="h2">Upload Notes</div>
        <UploadClassList
          list={this.state.classes}
          classMap={this.state.classMap}
        />
      </div>
    );
  }
}

export default withFirebase(UploadNotes);
