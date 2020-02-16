import React, { Component } from "react";
import ListSearch from "./tab_components/ListSearch";
import Button from "react-bootstrap/Button";
import CreateClassModal from "./tab_components/CreateClassModal";
import Alert from "react-bootstrap/Alert";

class JoinClasses extends Component {
  constructor() {
    super();
    this.handleCreateClassClick = this.handleCreateClassClick.bind(this);
    this.handleCreateClassClose = this.handleCreateClassClose.bind(this);
    this.handleCreateClassAdd = this.handleCreateClassAdd.bind(this);
    this.handleCreateClassAlertClose = this.handleCreateClassAlertClose.bind(
      this
    );
  }

  state = {
    list: ["Class 1", "Class 2", "Class 3", "Class 4"],
    showCreateClassModal: false,
    showCreateClassAlert: false
  };

  handleCreateClassClick() {
    this.setState({
      showCreateClassModal: true
    });
  }

  handleCreateClassClose() {
    this.setState({
      showCreateClassModal: false
    });
  }

  handleCreateClassAdd() {
    this.setState({
      showCreateClassModal: false,
      showCreateClassAlert: true
    });
  }

  handleCreateClassAlertClose() {
    this.setState({
      showCreateClassAlert: false
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container text-center">
          {this.state.showCreateClassAlert ? (
            <Alert
              variant="success"
              onClose={this.handleCreateClassAlertClose}
              dismissible
            >
              <p1>Class successfully created.</p1>
            </Alert>
          ) : null}
          {/* Show create class modal if button clicked */}
          {this.state.showCreateClassModal ? (
            <CreateClassModal
              onClose={this.handleCreateClassClose}
              onAdd={this.handleCreateClassAdd}
            />
          ) : null}
          {/* Header for JoinClasses including title and create class button */}
          <div className="row pb-2">
            <div className="col"></div>
            <div className="col-6 h2">Join a Class</div>
            <div className="col text-right">
              <Button onClick={this.handleCreateClassClick} variant="primary">
                Create New Class
              </Button>
            </div>
          </div>

          {/* List of classes with search bar */}
          <ListSearch
            list={this.state.list}
            placeholder="Search for Classes..."
          />
        </div>
      </React.Fragment>
    );
  }
}

export default JoinClasses;
