import React, { Component } from "react";
import ListSearch from "./tab_components/ListSearch";
import Alert from "react-bootstrap/Alert";

class JoinClasses extends Component {
  /**
   * Join Classes tab content component
   */

  state = {
    showCreateClassAlert: false
  };

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
          {/* Header for JoinClasses including title and create class button */}
          <div className="h2">Join a Class</div>

          {/* List of classes with search bar */}
          <ListSearch placeholder="Search for Classes..." />
        </div>
      </React.Fragment>
    );
  }
}

export default JoinClasses;
