import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import JoinClasses from "./components/joinClasses/joinClasses";
import MyClasses from "./components/myClasses/myClasses";
import UploadNotes from "./components/uploadNotes/uploadNotes";
import MyProfile from "./components/myProfile/myProfile";
import MySettings from "./components/mySettings/mySettings";

class MainTabs extends Component {
  components = {
    "Join Classes": JoinClasses,
    "My Classes": MyClasses,
    "Upload Notes": UploadNotes,
    "My Profile": MyProfile,
    "My Settings": MySettings
  };

  render() {
    return (
      // Dynamically add new Tabs and TabPanels based on tabNames
      <Tabs>
        <TabList className="react-tabs__tab-list navbar-light bg-dark text-white">
          {Object.keys(this.components).map(name => (
            <Tab key={name}>{name}</Tab>
          ))}
        </TabList>
        {/* Create Tab Panels for each Tab dynamically*/}
        {Object.keys(this.components).map(name => this.createTabPanel(name))}
      </Tabs>
    );
  }

  // Render proper component based on tab name
  createTabPanel(name) {
    const MyComponent = this.components[name];
    return (
      <TabPanel key={this.toKey(name) + "_panel"}>
        <MyComponent />
      </TabPanel>
    );
  }

  // Convert name to key form. ex) "My Example" => "my_example"
  toKey(name) {
    return name.toLowerCase().replace(" ", "_");
  }
}

export default MainTabs;
