import React, { Component } from "react";
import ListMyClasses from "./tab_components/ListMyClasses";

class MyClasses extends Component {
  state = { list: ["CIS 425", "ECS 392", "CIS 444", "CSE 486"] }; // List of classes

  render() {
    return (
      <div className="container text-center">
        <ListMyClasses list={this.state.list} />
      </div>
    );
  }
}

export default MyClasses;
