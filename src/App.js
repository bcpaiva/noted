import React, { Component } from "react";
import Title from "./components/header/Title";
import TabBar from "./components/header/TabBar";

class App extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Title />
        <TabBar />
      </React.Fragment>
    );
  }
}

export default App;
