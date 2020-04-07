import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import UploadClassModal from "./UploadClassModal";
import Alert from "react-bootstrap/Alert";

class UploadClassList extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleFailure = this.handleFailure.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
  }

  state = {
    clicked: {},
    classMap: this.props.classMap,
    showSuccessAlert: false,
    showFailureAlert: false,
    error: null
  };

  componentDidMount() {
    console.log("uploadclasslist map", this.state.classMap);
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

  // Disable all alerts
  handleCloseAlert() {
    this.setState({
      showSuccessAlert: false,
      showFailureAlert: false
    });
  }

  // Show success alert
  handleSuccess(classID) {
    this.updateClicked(classID, false);
    this.setState({
      showSuccessAlert: true
    });
  }

  // Show failure/error alert
  handleFailure(classID, error) {
    this.updateClicked(classID, false);
    this.setState({
      error: error,
      showFailureAlert: true
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showSuccessAlert ? (
          <Alert variant="success" onClose={this.handleCloseAlert} dismissible>
            <p1>Note successfully uploaded.</p1>
          </Alert>
        ) : null}
        {this.state.showFailureAlert ? (
          <Alert variant="danger" onClose={this.handleCloseAlert} dismissible>
            <p1>{this.state.error}</p1>
          </Alert>
        ) : null}

        <ListGroup>
          {this.props.list.map(classID =>
            this.state.clicked[classID] ? (
              <UploadClassModal
                classMap={this.state.classMap}
                theClass={classID}
                onCancel={() => this.handleCancel(classID)}
                onSuccess={() => this.handleSuccess(classID)}
                onAdd={() => this.handleNote(classID)}
                onFailure={error => this.handleFailure(classID, error)}

              />
            ) : (
              <ListGroup.Item action onClick={() => this.handleClick(classID)}>
                {classID}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
      </React.Fragment>
    );
  }
}

export default UploadClassList;
