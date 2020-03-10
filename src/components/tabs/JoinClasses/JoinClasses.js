import React, { Component } from "react";
import ClassListSearch from "./tab_components/ClassListSearch";
import Alert from "react-bootstrap/Alert";

class JoinClasses extends Component {
  /**
   * Join Classes tab content component
   */

  state = {};

  render() {
    return (
      <React.Fragment>
        <div className="container text-center">
          {/* Header for JoinClasses including title */}
          <div className="h2">Join a Class</div>

          {/* List of classes with search bar */}
          <ClassListSearch placeholder="Search by Class ID or Professor..." />
        </div>
      </React.Fragment>
    );
  }
}

export default JoinClasses;
