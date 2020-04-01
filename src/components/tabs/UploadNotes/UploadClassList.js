import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import UploadClassModal from "./UploadClassModal";

class UploadClassList extends Component {
  state = { clicked: {} };

  componentDidMount() {
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
    this.setState(prevState => {
      let clicked = prevState.clicked;
      delete clicked[classID];
      return clicked;
    });
  }
  render() {
    return (
      <ListGroup>
        {this.props.list.map(classID =>
          this.state.clicked[classID] ? (
            <UploadClassModal
              theClass={classID}
              key={classID + "_modal"}
              onCancel={() => this.handleCancel(classID)}
              onAdd={() => this.handleNote(classID)}
              
              // modalClassId = classID; 
              
            />
          ) : (
            <ListGroup.Item action onClick={() => this.handleClick(classID)}>
              {classID}
            </ListGroup.Item>
          )
        )}
      </ListGroup>
    );
  }
}

export default UploadClassList;
