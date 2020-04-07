import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ClassInfoModal from "./ClassInfoModal";
import { withFirebase } from "../../../Firebase";
import Alert from "react-bootstrap/Alert";

class ListMyClasses extends Component {
  constructor(props) {
    super(props);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }
  state = {
    classList: this.props.classList, // list of current user's classes
    clicked: {}, // Object that handles clicks on list items
    allImages: "",
    showDeleteClassAlert: false, //  Show the delete class confirmation alert
  };

  componentDidMount() {
    // let imageUrl = this.props.firebase.getNoteUrl("7c7v391zw5c408wzupfycg.png");
    // console.log("theimageurl", imageUrl);
    // var images = this.state.allImages
    // const self = this;
    // imageUrl.getDownloadURL().then(function (url){
    //   console.log("myurl",url)
    //   self.setState({allImages:["test"]})
    //  });
    //  console.log("images",images)

    let clickedObj = {};
    if (this.state.classList) {
      this.state.classList.map((item) => {
        return (clickedObj[item] = false);
      });
    }
    this.setState({ clicked: clickedObj });
  }

  // Change value of clicked for certain class
  updateClicked(classID, value) {
    this.setState((prevState) => {
      let clicked = prevState.clicked;
      clicked[classID] = value;
      return clicked;
    });
  }

  handleClick(classID) {
    this.updateClicked(classID, true);
  }

  handleCancel(className) {
    this.updateClicked(className, false);
  }
  // TODO: Open notes for class clicked
  handleNote(classID) {
    this.updateClicked(classID, false);
    // Remove class from available class

    // Remove class from clicked state
    this.setState((prevState) => {
      let clicked = prevState.clicked;
      delete clicked[classID];
      return clicked;
    });
  }

  // Handle the deletion of a class
  handleDeleteClass(classID) {
    // Hide info modal for class
    this.updateClicked(classID, false);

    // Show delete class confirmation alert
    this.setState({
      showDeleteClassAlert: true,
    });
    // Remove the class from the classList
    const index = this.state.classList.indexOf(classID);
    if (index > -1) {
      let classList = this.state.classList;
      classList.splice(index, 1);
      this.setState({
        classList: classList,
      });
      // If the class isn't found, log error in console.
    } else {
      console.log("Error: Class not found");
    }
  }

  // Handle the closing of the delete class confirmation alert
  handleCloseAlert() {
    this.setState({
      showDeleteClassAlert: false,
    });
  }

  render() {
    return (
      <React.Fragment>
        {/** Show delete class confirmation alert if enabled */}
        {this.state.showDeleteClassAlert ? (
          <Alert variant="success" onClose={this.handleCloseAlert} dismissible>
            <p1>Class successfully removed.</p1>
          </Alert>
        ) : null}
        {/** If the classList isn't empty, render either modal or list item.
         * Else, print "No classes available"
         */}
        {this.state.classList.length ? (
          <ListGroup>
            {/** Check what modal (if any) has to be rendered for a class */}
            {this.state.classList.map((classID) =>
              this.state.clicked[classID] ? (
                <ClassInfoModal
                  currentUser={this.props.currentUser}
                  theClass={classID}
                  key={classID + "_modal"}
                  onCancel={() => this.handleCancel(classID)}
                  onAdd={() => this.handleNote(classID)}
                  onDeleteClass={() => this.handleDeleteClass(classID)}
                />
              ) : (
                <ListGroup.Item
                  action
                  onClick={() => this.handleClick(classID)}
                >
                  {classID}
                </ListGroup.Item>
              )
            )}
          </ListGroup>
        ) : (
          <p>Add classes in the "Join Classes" tab</p>
        )}
      </React.Fragment>
    );
  }
}

export default withFirebase(ListMyClasses);
