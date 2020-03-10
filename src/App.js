import React, { Component } from "react";
import Title from "./components/header/Title";
import TabBar from "./components/header/TabBar";
import BasePage from "./components/login/BasePage";
import { withAuthentication } from "./components/Session";

class App extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  state = {
    loggedIn: true // Set to true to skip log-in page. (Disclaimer: User data won't be available)
  };

  // Set loggedIn state to true when there's a successful login
  handleLogin() {
    this.setState({
      loggedIn: true
    });
  }

  /* TEMPORARILY DISABLED: USELESS WITHOUT COOKIES
  componentWillMount() {
    // If user is not logged in, set state to false
    if (!this.props.firebase.getCurrentUser())
      this.setState({
        loggedIn: false
      }); 
  } 
*/

  render() {
    return (
      <React.Fragment>
        <Title />
        {this.state.loggedIn ? (
          <TabBar />
        ) : (
          <BasePage onLogin={this.handleLogin} />
        )}
      </React.Fragment>
    );
  }
}

export default withAuthentication(App);
