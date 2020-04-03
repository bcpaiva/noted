import React from 'react'
import axios, { post } from 'axios';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import UploadClassList from "./UploadClassList.js";
import { withFirebase } from "../../Firebase";



class UploadNotes extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    classes: [],
    classesIDs: [],
    classMap: {}
    
  };

  componentDidMount() {

  // Fetch data for current user
 this.props.firebase.fetchUserData(data => {
  let userData = data;
  for (let key in userData) {
    if (key == this.props.currentUser.uid){
      // When user is found, set the classes array to classesIDs
      let classIdentifiers = userData[key]["classes"]
      this.props.firebase.fetchClassData(dataClass => {
        let classData = dataClass;
        for (let value in classIdentifiers){
        var className = classData[classIdentifiers[value]]["data"]["class_id"];
        if (!this.state.classes.indexOf(className) > -1){
        this.state.classes = this.state.classes.concat(className)
        const uniqueNames = Array.from(new Set(this.state.classes));
        this.setState({classes: uniqueNames})
        this.state.classMap[className] = classIdentifiers[value];
        }
        }
      })
      
    } }})
}

 
  render() {
    if (!this.state.classes){
      return <React.Fragment />;
    }
    return (
      <div>
        {/* */}
        <UploadClassList list={this.state.classes} classMap={this.state.classMap}/>
      </div>
    );};}

export default withFirebase(UploadNotes);

