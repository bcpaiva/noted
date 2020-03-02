import React, { Component } from "react";
import Title from "./components/header/Title";
import TabBar from "./components/header/TabBar";
import LoginPage from "./components/login/LoginPage";
import { fetchClassData } from "./api/firebase";

class App extends Component {
  state = {
    loggedIn: false
  };

  componentWillMount() {
    // Get classes from firebase and assign them to classData state
    fetchClassData(classData =>
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
          <LoginPage />
        )}
      </React.Fragment>
    );
  }
}

export default App;
