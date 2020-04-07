import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { withFirebase } from "../../../Firebase";


class ClassInfoModal extends Component {
 
  componentDidMount(){
    const self = this;

    // Get class data from FB
    this.props.firebase.fetchClassData(data => {
      let classData = data;

      // Iterate through all of the class data until the correct match is found
      for (let key in classData){
        if (classData[key]["data"]["class_id"] == this.state.className){
        let allNotes = classData[key]["data"]["notes"]
        for (let note in allNotes){

          // Get correct FB url to download the image 
          let imageUrl = this.props.firebase.getNoteUrl(allNotes[note]);
          imageUrl.getDownloadURL().then(function (url){

            // Update the list of images that will be displayed in the Carousel
            self.setState({allImages: self.state.allImages.concat(url)})
           });
        }
        }
      }
    });




  }
  state = {
    allImages: [],
    className: this.props.theClass
  };
  render() {
    const items = []

    for (let image in this.state.allImages) {
        items.push( <div>
          <img src={this.state.allImages[image]} />
      </div>)
    }
    return (
      <React.Fragment>
        <Modal show={true} onHide={this.props.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Class Notes:</Modal.Title>
          </Modal.Header>
          <Modal.Body>

      <Carousel>        
     {items}
  </Carousel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.props.onAdd}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withFirebase(ClassInfoModal);