import React, { Component } from "react";
import ListSearch from "./tab_components/ListSearch";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { getClasses } from "../../../api/firebase";

class JoinClasses extends Component {
  /**
   * Join Classes tab content housing component
   */

  constructor() {
    super();
    // Get classes from firebase and assign them to class list
    getClasses(classData =>
      this.setState({
        classList: classData
      })
    );
  }

  state = {
    showCreateClassAlert: false
  };

  render() {
    // If firebase data hasn't been retrieved, don't render elements
    if (!this.state.classList) {
      return <div />;
    }
    // Else, render expected elements
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
          {/* Header for JoinClasses including title and create class button */}
          <div className="h2">Join a Class</div>

          {/* List of classes with search bar */}
          <ListSearch
            classList={this.state.classList}
            placeholder="Search for Classes..."
          />
        </div>
      </React.Fragment>
    );
  }
}

export default JoinClasses;
