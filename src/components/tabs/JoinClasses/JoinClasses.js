import React, { Component } from "react";
import ListSearch from "./tab_components/ListSearch";

class JoinClasses extends Component {
  state = {
    list: ["Class 1", "Class 2", "Class 3", "Class 4"]
  };

  render() {
    return (
      <div className="container text-center">
        <ListSearch
          list={this.state.list}
          placeholder="Search for Classes..."
        />
      </div>
    );
  }
}

export default JoinClasses;
