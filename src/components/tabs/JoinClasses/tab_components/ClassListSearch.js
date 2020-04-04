import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import JoinClassModal from "./JoinClassModal";
import Alert from "react-bootstrap/Alert";
import { withFirebase } from "../../../Firebase";

/**
 * This component renders a list of items that is searchable.  On list item click, a popup modal
 * is rendered to show them additional class info and allow them to add the class to their classes.
 */

class ClassListSearch extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    filtered: null, // Classes currently filtered from search bar input
    availableClasses: null, // All classes available to user
    clicked: {}, // key: class name, value: whether or not they're selected
    showAlert: false, // Default alert to off
    currentUserId: this.props.currentUser // If user is logged in,
      ? this.props.currentUser.uid // set to current user UID
      : null, // If not, set to null
    error: null // error log
  };

  // If component is created successfully,
  componentDidMount() {
    // Get classes from firebase and assign them to classData state
    this.props.firebase.fetchClassData(data => {
      let classData = data;
      console.log(this.props.currentUser);

      // Filter classData based on classes current user is already in
      for (let key in classData) {
        if (
          classData[key]["students"] &&
          classData[key]["students"].includes(this.state.currentUserId)
        ) {
          delete classData[key];
        }
      }

      // Update filtered and available classes with new class data
      this.setState({
        filtered: classData,
        availableClasses: classData
      });

      // Initialize clicked to false for all class objects after firebase data has been received
      let clickedObj = {};
      for (let key in this.state.availableClasses) {
        clickedObj[key] = false;
      }
      this.setState({ clicked: clickedObj });
    });
  }

  // Change value of clicked for certain class
  updateClicked(classKey, value) {
    this.setState(prevState => {
      let clicked = prevState.clicked;
      clicked[classKey] = value;
      return clicked;
    });
  }

  // Handle change to input in search bar
  handleChange(e) {
    let currentList = {};
    let newList = {};

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.availableClasses;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      const filter = e.target.value.toLowerCase();

      for (let key in currentList) {
        // Check if search value contains class ID or Professor
        let inSearch =
          currentList[key]["data"]["class_id"].toLowerCase().includes(filter) ||
          currentList[key]["data"]["professor"].toLowerCase().includes(filter);

        // Add to search list
        if (inSearch) {
          newList[key] = currentList[key];
        }
      }
    } else {
      // If the search bar is empty, set newList to original task list
      newList = this.state.availableClasses;
    }
    // Set the filtered state based on what our rules added to newList
    this.setState({
      filtered: newList
    });
  }

  // When a list element is clicked, set the element to clicked
  handleClick(classKey) {
    this.updateClicked(classKey, true);
  }

  // Reset button to unclicked if operation canceled
  handleClose(classKey) {
    this.updateClicked(classKey, false);
  }

  // Add user to class and adjust page accordingly
  handleAdd(classKey) {
    // Update clicked to turn off modal
    this.updateClicked(classKey, false);

    // Remove class from available class and filtered list
    delete this.state.availableClasses[classKey];
    delete this.state.filtered[classKey];

    // Remove class from clicked state
    this.setState(prevState => {
      let clicked = prevState.clicked;
      delete clicked[classKey];
      return clicked;
    });

    // Show alert that class add was successful
    this.setState({
      showAlert: true
    });

    this.props.firebase.addUserToClass(this.state.currentUserId, classKey);
  }

  // Hide alert when alert is closed
  handleCloseAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    // Don't render component until firebase data has been retrieved
    if (!this.state.filtered || !this.state.currentUserId) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        {/* Show alert if showAlert is true */}
        {this.state.showAlert ? (
          <Alert variant="success" onClose={this.handleCloseAlert} dismissible>
            <p1>Class successfully added.</p1>
          </Alert>
        ) : null}
        {/* Create ListGroup component */}
        <ListGroup>
          {/*Create search bar*/}
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
            placeholder={this.props.placeholder || "Search..."} //Default="Search..."
          />
          {/*Show modal to join class if clicked*/}
          {Object.keys(this.state.filtered).map(classKey => {
            return (
              // If class was clicked, show add class modal
              this.state.clicked[classKey] ? (
                <JoinClassModal
                  data={this.state.availableClasses[classKey]["data"]}
                  key={classKey + "modal"}
                  onClose={() => this.handleClose(classKey)}
                  onAdd={() => this.handleAdd(classKey)}
                />
              ) : null
            );
          })}

          {/*Create list items dynamically based on filtered list*/}
          {console.log("filtered: ", this.state.availableClasses)}

          {/** If there are no classes available, show message */}
          {Object.keys(this.state.filtered).length == 0 ? (
            <p>No classes available</p>
          ) : null}

          {Object.keys(this.state.filtered).map(classKey => {
            return (
              // Show each class item in ListGroup
              <ListGroup.Item
                action
                key={classKey + "item"}
                onClick={() => this.handleClick(classKey)}
              >
                <div className="row">
                  <div className="col-sm" />
                  <div className="col-sm text-center">
                    {this.state.filtered[classKey]["data"]["class_id"]}
                  </div>
                  <div className=" col-sm text-right">
                    <small>
                      {this.state.filtered[classKey]["data"]["professor"]}
                    </small>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default withFirebase(ClassListSearch);
