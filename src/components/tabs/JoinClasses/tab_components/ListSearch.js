import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import JoinClassModal from "./JoinClassModal";
import Alert from "react-bootstrap/Alert";

/**
 * This component renders a list of items that is searchable.  On list item click, a popup modal
 * is rendered to show them additional class info and allow them to add the class to their classes.
 */

class ListSearch extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    filtered: [], // Classes currently filtered from search bar input
    availableClasses: [], // All classes available to user
    clicked: {}, // key: class name, value: whether or not they're selected
    showAlert: false // Default alert to off
  };

  //If component is created successfully,
  componentDidMount() {
    //default filtered and availableClassses lists to entire list
    this.setState({
      filtered: this.props.list,
      availableClasses: this.props.list
    });
    //Initialize clicked to false for all class objects
    let clickedObj = {};
    this.props.list.map(item => {
      return (clickedObj[item] = false);
    });
    this.setState({ clicked: clickedObj });
  }

  // Change value of clicked for certain class
  updateClicked(classID, value) {
    this.setState(prevState => {
      let clicked = prevState.clicked;
      clicked[classID] = value;
      return clicked;
    });
  }

  // Handle change to input in search bar
  handleChange(e) {
    let currentList = [];

    let newList = [];

    // If the search bar isn't empty
    if (e.target.value !== "") {
      // Assign the original list to currentList
      currentList = this.state.availableClasses;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      newList = currentList.filter(item => {
        const lc = item.toLowerCase();

        const filter = e.target.value.toLowerCase();
        // check to see if the current list item includes the search term
        // If it does, it will be added to newList.
        return lc.includes(filter);
      });
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
  handleClick(classID) {
    this.updateClicked(classID, true);
  }

  // Reset button to unclicked if operation canceled
  handleClose(classID) {
    this.updateClicked(classID, false);
  }

  // TODO: Add class to user's class list if added
  handleAdd(classID) {
    this.updateClicked(classID, false);
    // Remove class from available class
    this.state.availableClasses.splice(
      this.state.availableClasses.indexOf(classID),
      1
    );
    // Remove class from clicked state
    this.setState(prevState => {
      let clicked = prevState.clicked;
      delete clicked[classID];
      return clicked;
    });
    // Show alert that class add was successful
    this.setState({
      showAlert: true
    });
  }

  // Hide alert when alert is closed
  handleCloseAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
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
          {/*Create list items dynamically based on filtered list*/}
          {this.state.filtered.map(classID =>
            // If class was clicked, show add class modal
            this.state.clicked[classID] ? (
              <JoinClassModal
                key={classID + "_modal"}
                onClose={() => this.handleClose(classID)}
                onAdd={() => this.handleAdd(classID)}
              />
            ) : (
              // If not, show class item in ListGroup
              <ListGroup.Item
                action
                key={classID + "_listitem"}
                onClick={() => this.handleClick(classID)}
              >
                {classID}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default ListSearch;
