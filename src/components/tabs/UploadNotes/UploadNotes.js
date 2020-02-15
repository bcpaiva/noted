import React, { Component } from "react";
import { db } from "../../../api/firebase";

class UploadNotes extends Component {
  state = {};

  componentDidMount() {
    db.collection("cities")
      .doc("NY")
      .set({
        name: "Las Vegas",
        state: "CA",
        country: "USA"
      })
      .then(function() {
        console.log("Document successfully written!");
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container text-center">
          <p>This is where Upload Notes page content goes</p>
        </div>
      </React.Fragment>
    );
  }
}

export default UploadNotes;
