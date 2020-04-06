import React, { Component } from "react";
import ClassListSearch from "./tab_components/ClassListSearch";
import Alert from "react-bootstrap/Alert";
import { AuthUserContext } from "../../Session";

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
          <AuthUserContext.Consumer>
          {authUser =>
          <ClassListSearch currentUser={authUser} placeholder="Search by Class ID or Professor..." />}
          </AuthUserContext.Consumer>
        </div>
      </React.Fragment>
    );
  }
}

export default JoinClasses;

