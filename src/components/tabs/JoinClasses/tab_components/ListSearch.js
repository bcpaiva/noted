import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import AddClassModal from "./AddClassModal";
import AddClassAlert from "./AddClassAlert";

/* 
***************************************
PROPS:
    - list: List of items that are searchable.
    - placeholder: placeholder text for search bar.  Default="Search..."
***************************************
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
    //default filtered list to entire list
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
  updateClicked(className, value) {
    this.setState(prevState => {
      let clicked = prevState.clicked;
      clicked[className] = value;
      return clicked;
    });
  }

  // Handle change to input into search bar
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
  handleClick(className) {
    this.updateClicked(className, true);
  }

  // Reset button to unclicked if operation canceled
  handleCancel(className) {
    this.updateClicked(className, false);
  }

  // TODO: Add class to user's class list if added
  handleAdd(className) {
    this.updateClicked(className, false);
    // Remove class from available class
    this.state.availableClasses.splice(
      this.state.availableClasses.indexOf(className),
      1
    );
    // Remove class from clicked state
    this.setState(prevState => {
      let clicked = prevState.clicked;
      delete clicked[className];
      return clicked;
    });
    this.setState({
      showAlert: true
    });
  }

  // Hide alert when closed
  handleCloseAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.showAlert ? (
          <AddClassAlert onClose={this.handleCloseAlert} />
        ) : null}
        <ListGroup>
          {/*Create search bar*/}
          <input
            type="text"
            className="form-control"
            onChange={this.handleChange}
            placeholder={this.props.placeholder || "Search..."}
          />
          {/*Create list items dynamically based on filtered list*/}
          {this.state.filtered.map(className =>
            this.state.clicked[className] ? (
              <AddClassModal
                key={className + "_modal"}
                onCancel={() => this.handleCancel(className)}
                onAdd={() => this.handleAdd(className)}
              />
            ) : (
              <ListGroup.Item
                action
                key={className + "_listitem"}
                onClick={() => this.handleClick(className)}
              >
                {className}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default ListSearch;
