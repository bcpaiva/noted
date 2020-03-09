import React, { Component } from "react";
import Title from "./components/header/Title";
import TabBar from "./components/header/TabBar";
import LoginPage from "./components/login/LoginPage";
import { withFirebase } from "./components/Firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  state = {
    loggedIn: true
  };

  handleLogin() {
    this.setState({
      loggedIn: true
    });
  }

  componentWillMount() {
    // If user is not logged in, set state to false
    /* TEMPORARILY DISABLED
    if (!this.props.firebase.getCurrentUser())
      this.setState({
        loggedIn: false
      });
      */

    // Get classes from firebase and assign them to classData state
    this.props.firebase.fetchClassData(classData =>
      this.setState({
        classData: classData
      })
    );
  }

  render() {
    // Don't render the app until data has been retrieved from firebase
    if (!this.state.classData) {
      return <div />;
    }

    return (
      <React.Fragment>
        <Title />
        {this.state.loggedIn ? (
          <TabBar classData={this.state.classData} />
        ) : (
          <LoginPage onLogin={this.handleLogin} />
        )}
      </React.Fragment>
    );
  }
}

export default withFirebase(App);
