import React from 'react';
import RootRef from '@material-ui/core/RootRef';

import {SCREENS, UPLOAD_STEPS} from './../constants/Navigation';

import {DropzoneArea} from 'material-ui-dropzone';
import {Button, CircularProgress} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import NextIcon from '@material-ui/icons/ArrowForward';
import UploadIcon from "@material-ui/icons/Publish";
import CancelIcon from "@material-ui/icons/Clear";

import "../upload/upload.css"

// check out https://yuvaleros.github.io/material-ui-dropzone/ for documentation
class UploadArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      step: UPLOAD_STEPS.upload,
    };
    this.fileRef = React.createRef();
  }

  // for uploading files aka step 0
  updateFiles = files => {
    this.setState({
      files: files,
    })
  }

  // if a user wants to cancel
  cancelFileUpload = () => {
    this.setState({
      step: UPLOAD_STEPS.upload,
    });
  }

  // for processing the file aka step 1
  processText = () => {
    this.setState({
      step: UPLOAD_STEPS.parse,
    });
  }

  getNavButtons() {
    switch (this.state.step) {
      case UPLOAD_STEPS.upload:
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<HomeIcon />}
              onClick={() => this.props.switchScreen(SCREENS.home)}
            >
              Home
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<UploadIcon />}
              disabled={this.state.files.length != 1}
              onClick={() => this.processText()}
            >
              Upload
            </Button>
          </div>
        );
      case UPLOAD_STEPS.parse:
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<CancelIcon />}
              onClick={() => this.cancelFileUpload()}
            >
              Cancel
            </Button>
          </div>
        );
      case UPLOAD_STEPS.select:
        return (
          <div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<NextIcon/>}
              onClick={() => this.props.switchScreen(SCREENS.practice)}
            >
              Begin
            </Button>
          </div>
        )
    }
  }

  getArena() {
    switch (this.state.step) {
      case UPLOAD_STEPS.upload:
        return (
          <div> 
            <DropzoneArea
              onChange={(files) => this.updateFiles(files)}
              acceptedFiles={['.txt']}
              filesLimit={1}
              dropzoneText={"Drag and drop your script (.txt files only) or click here"}
            />
          </div>
        );
      case UPLOAD_STEPS.parse:
        return (
          <div>
            <CircularProgress />
            Your file is being processed.
          </div>
        );
      case UPLOAD_STEPS.select:
        return (
          <div></div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.getArena()}
        {this.getNavButtons()}
      </div>
    );
  }
}

export default UploadArena;
