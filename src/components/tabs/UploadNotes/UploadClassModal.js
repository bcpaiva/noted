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
  progress: 0,
  classMap: this.props.classMap,
  randomId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  };

  componentDidMount(){
    console.log("classmap",this.state.classMap)
  }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({progress: 100});
    firebase
      .storage()
      .ref("images")
      .child(filename)
    console.log("printing",this.state.classMap);

    this.props.firebase.addNoteToClass(this.state.randomId,this.state.classMap[this.props.theClass]);
  };
  render() {
    return (
      <React.Fragment>
        <Modal show={true} onHide={this.props.onCancel}>
          <Modal.Header closeButton>
    <Modal.Title>Choose an image file from your device to upload for {this.props.theClass}.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
    <div><p>Upload progress: {this.state.progress}%</p></div>

            {this.props.data ||
            <div>
           {/* < button type="button" class="btn btn-primary">Choose file</button> */}
           {/* <input type="text" class="form-control input-lg" name="email" value="Input name of"></input> */}
           <FileUploader
            accept="image/*"
            filename={file =>this.state.randomId}
            storageRef={firebase.storage().ref("classnotes")}
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
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withFirebase(UploadClassModal);
