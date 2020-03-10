import React, { Component } from "react";
import Title from "./components/header/Title";
import TabBar from "./components/header/TabBar";
import BasePage from "./components/login/BasePage";
import { withFirebase } from "./components/Firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  state = {
    loggedIn: false //TODO: Set to false for production
  };

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

export default withFirebase(App);
