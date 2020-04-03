import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { withFirebase } from "../../../Firebase";


class ClassInfoModal extends Component {
  
  convertToUrl = (pathValue) => {

  }

  componentDidMount(){
    const self = this;
    this.props.firebase.fetchClassData(data => {
      let classData = data;
      console.log("classdata",data);
      for (let key in classData){
        if (classData[key]["data"]["class_id"] == this.state.className){
        let allNotes = classData[key]["data"]["notes"]
        for (let note in allNotes){
          let imageUrl = this.props.firebase.getNoteUrl(allNotes[note]);
          imageUrl.getDownloadURL().then(function (url){
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
          <p className="legend">Legend 1</p>
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