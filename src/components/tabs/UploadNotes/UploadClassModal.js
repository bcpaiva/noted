import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import UploadClassList from "./UploadClassList.js";
import { useAlert } from 'react-alert';
import { withFirebase } from "../../Firebase";

class UploadClassModal extends Component {
  state = {
  modalClassId: this.props.classID
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
      // const UploadClassModal = () => {
      //   const alert = useAlert()
      //   alert.show('Oh look, an alert!')
      // }
      // const alert = alert.show('Some message', {
      //   timeout: 2000, // custom timeout just for this one alert
      //   type: 'success',
      //   onOpen: () => {
      //     console.log('hey')
      //   }, // callback that will be executed after this alert open
      //   onClose: () => {
      //     console.log('closed')
      //   } // callback that will be executed after this alert is removed
      // })
    console.log("success");
    console.log(this.props.key);

    this.props.firebase.addNoteToClass("noteid1","UzIQ76RKyw4fSoann1Wg");
  };
  render() {
    return (
      <React.Fragment>
        <Modal show={true} onHide={this.props.onCancel}>
          <Modal.Header closeButton>
    <Modal.Title>Choose an image file from your device to upload for {this.props.theClass}.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.data ||
            <div>
           {/* < button type="button" class="btn btn-primary">Choose file</button> */}
           {/* <input type="text" class="form-control input-lg" name="email" value="Input name of"></input> */}
           <FileUploader
            accept="image/*"
            name="avatar"
            filename={file =>"newnote"}
            storageRef={firebase.storage().ref("mynotes")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
           </div>
             /* TODO: Pull class data from Firebase */}
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.props.onAdd}>
              Upload Notes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withFirebase(UploadClassModal);
