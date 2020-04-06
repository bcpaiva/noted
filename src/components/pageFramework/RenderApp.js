import React, { Component } from "react";
import Title from "../header/Title";
import TabBar from "../header/TabBar";
import LoginPage from "../login/LoginPage";

/**
 * Basic component where decisions are made on what main components to render
 */

class RenderApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Title
          loggedIn = {this.props.loggedIn}
          currentUser={this.props.currentUser}
        />
        {this.props.loggedIn ? (
          <TabBar currentUser={this.props.currentUser} />
        ) : (
          <LoginPage/>
        )}
      </React.Fragment>
    );
  }
}

export default RenderApp;
