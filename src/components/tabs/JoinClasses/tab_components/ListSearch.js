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
    filtered: null, // Classes currently filtered from search bar input
    availableClasses: null, // All classes available to user
    clicked: {}, // key: class name, value: whether or not they're selected
    showAlert: false // Default alert to off
  };

  //If component is created successfully,
  componentDidMount() {
    this.setState({
      filtered: this.props.classData,
      availableClasses: this.props.classData
    });
  }

  componentDidCatch() {
    //Initialize clicked to false for all class objects
    let clickedObj = {};
    Object.keys(this.state.availableClasses).map(classKey => {
      return (clickedObj[classKey] = false);
    });
    this.setState({ clicked: clickedObj });
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
      Object.keys(currentList).map(classKey => {
        if (
          currentList[classKey]["data"]["Class ID"]
            .toLowerCase()
            .includes(filter)
        ) {
          newList[classKey] = currentList[classKey];
        }
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
  handleClick(classKey) {
    this.updateClicked(classKey, true);
  }

  // Reset button to unclicked if operation canceled
  handleClose(classKey) {
    this.updateClicked(classKey, false);
  }

  // TODO: Add class to user's class list if added
  handleAdd(classKey) {
    this.updateClicked(classKey, false);
    // Remove class from available class
    delete this.state.availableClasses[classKey];

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
  }

  // Hide alert when alert is closed
  handleCloseAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    // Don't render component until firebase data has been retrieved
    if (!this.state.filtered) {
      return <div />;
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
                  <div class=" col-sm text-right">
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

export default ListSearch;
