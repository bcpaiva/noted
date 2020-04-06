import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import { withFirebase } from "../../Firebase";
import ProgressBar from "react-bootstrap/ProgressBar";

class UploadClassModal extends Component {
  state = {
    progress: 0,
    classMap: this.props.classMap,
    randomId:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
  };

  componentDidMount() {
    console.log("classmap", this.state.classMap);
  }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    // If user canceled upload, give canceled notification. Else, show error message
    let errorMessage =
      error["code"] == "storage/canceled"
        ? "Upload canceled."
        : error["message"];
    this.props.onFailure(errorMessage);
    console.error(error);
  };

  handleUploadSuccess = filename => {
    console.log(filename);
    this.setState({ progress: 100 });
    firebase
      .storage()
      .ref("images")
      .child(filename);
    console.log("printing", this.state.classMap);

    this.props.firebase.addNoteToClass(
      filename,
      this.state.classMap[this.props.theClass]
    );
    this.props.onSuccess();
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={true} onHide={this.props.onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>
              Choose an image file from your device to upload for{" "}
              {this.props.theClass}.
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.data || (
              <div>
                {/* < button type="button" class="btn btn-primary">Choose file</button> */}
                {/* <input type="text" class="form-control input-lg" name="email" value="Input name of"></input> */}
                <label className="btn btn-primary">
                  Upload Note
                  <FileUploader
                    hidden
                    accept="image/*"
                    filename={file => this.state.randomId}
                    storageRef={firebase.storage().ref("classnotes")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                  />
                </label>
                {/** Show status bar if note is being uploaded */}
                {this.state.progress != 0 ? (
                  <ProgressBar
                    animated
                    now={this.state.progress}
                    label={this.state.progress + "%"}
                  />
                ) : null}
              </div>
            )
            /* TODO: Pull class data from Firebase */
            }
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withFirebase(UploadClassModal);
