import React from 'react';
import { Link } from "react-router-dom";

import {SCREENS, UPLOAD_STEPS} from './../constants/Navigation';

import {DropzoneArea} from 'material-ui-dropzone';
import {
  Button, 
  CircularProgress, 
  Select, 
  MenuItem,
  InputLabel,
  FormControl
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import NextIcon from '@material-ui/icons/ArrowForward';
import UploadIcon from "@material-ui/icons/Publish";
import DownloadIcon from "@material-ui/icons/GetApp";
import CancelIcon from "@material-ui/icons/Clear";

import "./upload.css"

// check out https://yuvaleros.github.io/material-ui-dropzone/ for documentation
class UploadArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      text: "",
      lines: [],
      step: UPLOAD_STEPS.upload,
      selectedSpeaker: '',
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
    // loading screen
    this.setState({
      step: UPLOAD_STEPS.parse,
    });

    // grab text from the file
    let file = this.state.files[0];

    file.text().then(text => {
      // parse the text
      let {speakers, lines} = this.getLines(text);

      // update
      this.setState({
        text: text,
        lines: lines,
        speakers: speakers,
        step: UPLOAD_STEPS.select,
      });

    })
  }

  // parses the text into an array of {speaker: "Speaker 1", line: ["word", "word", ...] }
  getLines = (text) => {
    let uniqueSpeakers = [];

    let lines = text.split("\n");

    let linesBySpeaker = lines.map(line => {
      let [speaker, ...rest] = line.split(':');

      // if speaker is new, add to uniqueSpeakers
      if (!uniqueSpeakers.includes(speaker)) {
        uniqueSpeakers.push(speaker);
      }

      // rejoin the other words
      rest = rest.join(":")

      // get rid of special characters
      rest = rest.replace(/[^a-zA-Z ]/g, "")
      
      // split into individual words
      rest = rest.split(" ");

      // remove any empty strings
      rest = rest.filter(item => item);

      // reformat
      return {"speaker": speaker, "line": rest};
    })

    return {speakers: uniqueSpeakers, lines: linesBySpeaker};

  }

  // switches the speaker that the user wants
  handleSelectSpeaker = (event) => {
    this.setState({
      selectedSpeaker: event.target.value
    });
  }

  // sends practice config back to parent component, App.js
  beginPractice = () => {
    let config = {
      lines: this.state.lines,
      speakers: this.state.speakers,
      selectedSpeaker: this.state.selectedSpeaker
    };

    this.props.setupPractice(config);
    this.props.switchScreen(SCREENS.practice);
  }

  getNavButtons() {
    switch (this.state.step) {
      case UPLOAD_STEPS.upload:
        return (
          <div className="Bottom">
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<HomeIcon />}
              onClick={() => this.props.switchScreen(SCREENS.home)}
            >
              Home
            </Button>
            <div>
            <Link to="/SampleFile.txt" target="_blank" download>
              <Button
                variant="contained"
                color="primary"
                size="large"
                endIcon={<DownloadIcon />}
              >
                Sample File
              </Button>
            </Link>
            </div>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<UploadIcon />}
              disabled={this.state.files.length != 1}
              onClick={() => this.processText()}
            >
              Upload File
            </Button>
          </div>
        );
      case UPLOAD_STEPS.parse:
        return (
          <div className="Bottom">
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
          <div className="Bottom">
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<NextIcon/>}
              onClick={() => this.beginPractice()}
              disabled={this.state.selectedSpeaker == ''}
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
              dropzoneText={"Drag and drop your script here (.txt files only) or click"}
            />
          </div>
        );
      case UPLOAD_STEPS.parse:
        return (
          <div>
            <CircularProgress />
            <br/>
            Your file is being processed.
          </div>
        );
      case UPLOAD_STEPS.select:
        return (
          <div>
            <FormControl style={{minWidth: 200}}>
              <InputLabel id="select-speaker-label">
                Select Your Role
              </InputLabel>
              <Select
                labelId="select-speaker"
                id="select-speaker"
                value={this.state.selectedSpeaker}
                onChange={this.handleSelectSpeaker}
              >
                {this.state.speakers.map(speaker => {
                  return (
                    <MenuItem value={speaker} key={speaker}>
                      {speaker}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </div>
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
