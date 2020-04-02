import React, { Component } from "react";
import { withAuthentication, AuthUserContext } from "./components/Session";
import RenderApp from "./components/pageFramework/RenderApp";

class App extends Component {
  state = {};

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <RenderApp
            currentUser={authUser}
            loggedIn={authUser ? true : false}
          />
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withAuthentication(App);
