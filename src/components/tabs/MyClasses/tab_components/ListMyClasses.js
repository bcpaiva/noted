import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ClassInfoModal from "./ClassInfoModal";
import { withFirebase } from "../../../Firebase";
import image from "react-firebase-file-uploader/lib/utils/image";


class ListMyClasses extends Component {

  // constructor(){
  //   super();
  //   this.state = {allImages: []};
  // }
  state = { clicked: {} , 
  allImages: ""
};

  componentDidMount() {
    // let imageUrl = this.props.firebase.getNoteUrl("7c7v391zw5c408wzupfycg.png");
    // console.log("theimageurl", imageUrl);
    // var images = this.state.allImages
    // const self = this;
    // imageUrl.getDownloadURL().then(function (url){
    //   console.log("myurl",url)
    //   self.setState({allImages:["test"]})
    //  });
    //  console.log("images",images)

    let clickedObj = {};
    this.props.list.map(item => {
      return (clickedObj[item] = false);
    });
    this.setState({ clicked: clickedObj });
    
  }

  // Change value of clicked for certain class
  updateClicked(classID, value) {
    this.setState(prevState => {
      let clicked = prevState.clicked;
      clicked[classID] = value;
      return clicked;
    });
  }

  handleClick(classID) {
    this.updateClicked(classID, true);
  }

  handleCancel(className) {
    this.updateClicked(className, false);
  }
  // TODO: Open notes for class clicked
  handleNote(classID) {
    this.updateClicked(classID, false);
    // Remove class from available class

    // Remove class from clicked state
    this.setState(prevState => {
      let clicked = prevState.clicked;
      delete clicked[classID];
      return clicked;
    });
  }
  render() {
    return (
      <ListGroup>
        {this.props.list.map(classID =>
          this.state.clicked[classID] ? (
            <ClassInfoModal
              theClass = {classID}
              key={classID + "_modal"}
              onCancel={() => this.handleCancel(classID)}
              onAdd={() => this.handleNote(classID)}
            />
          ) : (
            <ListGroup.Item action onClick={() => this.handleClick(classID)}>
              {classID}
            </ListGroup.Item>
          )
        )}
      </ListGroup>
    );
  }
}

export default withFirebase(ListMyClasses);
