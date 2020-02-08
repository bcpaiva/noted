import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class MainTabs extends Component {
  render() {
    return (
      <Tabs>
        <TabList className="navbar-light bg-light">
          <Tab>Join Classes</Tab>
          <Tab>My Classes</Tab>
          <Tab>Upload Notes</Tab>
          <Tab>My Profile</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanel>
          <p class="pl-3">Add "Join Classes" panel content here</p>
        </TabPanel>
        <TabPanel>
          <p class="pl-3">Add "My Classes" panel content here</p>
        </TabPanel>
        <TabPanel>
          <p class="pl-3">Add "Upload Notes" panel content here</p>
        </TabPanel>
        <TabPanel>
          <p class="pl-3">Add "My Profile" panel content here</p>
        </TabPanel>
        <TabPanel>
          <p class="pl-3">Add "Settings" panel content here</p>
        </TabPanel>
      </Tabs>
    );
  }
}

export default MainTabs;
