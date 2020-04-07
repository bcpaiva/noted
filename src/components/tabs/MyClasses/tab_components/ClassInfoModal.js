import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { withFirebase } from "../../../Firebase";
import RemoveClassModal from "./RemoveClassModal";

class ClassInfoModal extends Component {
  constructor(props) {
    super(props);
    this.handleRmClassCancel = this.handleRmClassCancel.bind(this);
    this.handleRmClassClick = this.handleRmClassClick.bind(this);
    this.handleRmClassConfirm = this.handleRmClassConfirm.bind(this);
  }

  state = {
    allImages: [],
    className: this.props.theClass,
    showDeleteClassModal: false,
    classUid: null,
  };

  componentDidMount() {
    const self = this;
    this.props.firebase.fetchClassData((data) => {
      let classData = data;
      console.log("classdata", data);
      for (let key in classData) {
        if (classData[key]["data"]["class_id"] === this.state.className) {
          this.setState({
            classUid: key,
          });
          let allNotes = classData[key]["data"]["notes"];
          for (let note in allNotes) {
            let imageUrl = this.props.firebase.getNoteUrl(allNotes[note]);
            imageUrl.getDownloadURL().then(function (url) {
              self.setState({ allImages: self.state.allImages.concat(url) });
            });
          }
        }
      }
    });
  }

  // Handle click of Remove Class button
  handleRmClassClick() {
    this.setState({
      showDeleteClassModal: true,
    });
  }

  // Handle click Cancel button of Remove Class Modal
  handleRmClassCancel() {
    this.setState({
      showDeleteClassModal: false,
    });
  }

  // Handle click Confirm button of Remove Class Modal
  handleRmClassConfirm() {
    this.props.firebase.removeUserFromClass(
      this.props.currentUser.uid,
      this.state.classUid,
      () => {
        this.setState({
          showDeleteClassModal: false,
        });
        this.props.onDeleteClass();
      }
    );
  }

  render() {
    const items = [];

    for (let image in this.state.allImages) {
      items.push(
        <div>
          <img alt="class notes" src={this.state.allImages[image]} />
        </div>
      );
    }
    return (
      <React.Fragment>
        {/* Show Delete Class Modal if Remove Class button clicked */}
        {this.state.showDeleteClassModal ? (
          <RemoveClassModal
            classId={this.state.className}
            onCancel={this.handleRmClassCancel}
            onConfirm={this.handleRmClassConfirm}
          />
        ) : null}
        {/** Show Class Info Modal */}
        <Modal show={true} onHide={this.props.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Class Notes:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel>{items}</Carousel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleRmClassClick}>
              Remove Class
            </Button>
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
