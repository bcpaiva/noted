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
          onLogout={this.handleLogout}
          currentUser={this.props.currentUser}
        />
        {this.props.loggedIn ? (
          <TabBar currentUser={this.props.currentUser} />
        ) : (
          <LoginPage onLogin={this.handleLogin} />
        )}
      </React.Fragment>
    );
  }
}

export default RenderApp;
