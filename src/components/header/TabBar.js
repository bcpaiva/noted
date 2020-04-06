import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";

import JoinClasses from "../tabs/JoinClasses/JoinClasses";
import MyClasses from "../tabs/MyClasses/MyClasses";
import UploadNotes from "../tabs/UploadNotes/UploadNotes";
import MyProfile from "../tabs/MyProfile/MyProfile";

/**
 * This component renders the tab bar, and the corresponding tab content
 */

class TabBar extends Component {
  state = {
    // Current active tab
    activeTab: JoinClasses,

    // All tabs where key = eventKey, and content = corresponding react component
    tabs: {
      "My Profile": MyProfile,
      "Join Classes": JoinClasses,
      "My Classes": MyClasses,
      "Upload Notes": UploadNotes,

    }
  };

  // Return the active tab as a react component
  getActiveTab() {
    const ActiveTab = this.state.activeTab;
    return <ActiveTab currentUser={this.props.currentUser} />;
  }

  // set active tab to proper tab
  handleSelect = eventKey => {
    this.setState({
      activeTab: this.state.tabs[eventKey]
    });
  };

  render() {
    return (
      <React.Fragment>
        {/** Navigation (tab) bar component */}
        <Nav
          className="navbar-light bg-light text-white pl-5 pt-2"
          variant="tabs"
          defaultActiveKey="Join Classes"
          onSelect={this.handleSelect}
        >
          {/** Each tab bar item */}
          <Nav.Item>
              <Nav.Link eventKey="My Profile">My Profile</Nav.Link>
            </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Join Classes">Join Classes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="My Classes">My Classes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Upload Notes">Upload Notes</Nav.Link>
          </Nav.Item>
        </Nav>
        {/** Render proper tab content */}
        <div className="pt-4">{this.getActiveTab()}</div>
      </React.Fragment>
    );
  }
}

export default TabBar;
