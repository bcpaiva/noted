import React, { Component } from "react";
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA3UGnZkHIiUm4Hasvqq4aRbEKpB83BVIA",
  authDomain: "noted-24e52.firebaseapp.com",
  databaseURL: "https://noted-24e52.firebaseio.com",
  projectId: "noted-24e52",
  storageBucket: "noted-24e52.appspot.com",
  messagingSenderId: "85650534633",
  appId: "1:85650534633:web:e545957dd77ea2949c4078",
  measurementId: "G-TFF9KXG0LL"
}

class UploadNotes extends Component {
  state = {};
  render() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
  }
    const db = firebase.firestore();
    db.collection("cities").doc("NY").set({
      name: "Las Vegas",
      state: "CA",
      country: "USA"
  })
  .then(function() {
      console.log("Document successfully written!");
  })
    return (
      <div className="container text-center">
        <p>This is where Upload Notes page content goes</p>
      </div>
    );
  }
}

export default UploadNotes;
