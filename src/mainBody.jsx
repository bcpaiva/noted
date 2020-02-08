import React, { Component } from "react";
import MainTabs from "./mainTabs";

class MainBody extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="display-4 navbar bg-primary text-white">Noted.</div>
        <MainTabs></MainTabs>
      </React.Fragment>
    );
  }
}

export default MainBody;
