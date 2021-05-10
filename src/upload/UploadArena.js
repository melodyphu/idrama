import React from "react";
import { Link } from "react-router-dom";

import { SCREENS, UPLOAD_STEPS } from "./../constants/Navigation";
import TEXT_SPECS from "./../constants/Text";

import { DropzoneArea } from "material-ui-dropzone";
import {
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import NextIcon from "@material-ui/icons/ArrowForward";
import DownloadIcon from "@material-ui/icons/GetApp";
import CancelIcon from "@material-ui/icons/Clear";
import SectionIcon from '@material-ui/icons/ArrowForwardIos';

import "./upload.css";

// check out https://yuvaleros.github.io/material-ui-dropzone/ for documentation
class UploadArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      text: "",
      script: [],
      step: UPLOAD_STEPS.upload,
      selectedSpeaker: "",
    };
    this.fileRef = React.createRef();
  }

  // for uploading files aka step 0
  updateFiles = (files) => {
    this.setState({
      files: files,
    });
  };

  // if a user wants to cancel
  cancelFileUpload = () => {
    this.setState({
      files: [],
      text: "",
      script: [],
      step: UPLOAD_STEPS.upload,
      selectedSpeaker: "",
    });
  };

  // for processing the file aka step 1
  processText = () => {
    // loading screen
    this.setState({
      step: UPLOAD_STEPS.parse,
    });

    // grab text from the file
    let file = this.state.files[0];

    file.text().then((text) => {
      // parse the text
      let { speakers, script } = this.getScript(text);

      // update
      this.setState({
        text: text,
        script: script,
        speakers: speakers,
        step: UPLOAD_STEPS.select,
      });
    });
  };

  // [{section: "Stanza 1", lines: [{speaker: "Speaker 1", line: ["word", "word"]}]}]
  getScript = (text) => {
    let allLines = text.split("\n");

    let uniqueSpeakers = [];
    let script = [];
    
    let sectionObj = {section: "", lines: []};
    let sectionIdx = 0;

    for (let line of allLines) {
      // section header
      if (line.startsWith(TEXT_SPECS.sectionHeader)){
        // push old section obj into script;
        if (sectionObj.lines.length > 0) {
          script.push(sectionObj);
          sectionObj = {};
        }

        // start a new section
        let sectionName = line.replace(TEXT_SPECS.sectionHeader, "");
        if (sectionName.length > 0) {
          sectionObj.section = sectionName;
        } else { // default section title
          sectionObj.section = TEXT_SPECS.defaultName + sectionIdx.toString();
        }

        sectionObj.lines = [];
        sectionIdx += 1;

      } else { // parse the individual line
        let [speaker, ...rest] = line.split(":");

        // if speaker is new, add to uniqueSpeakers
        if (!uniqueSpeakers.includes(speaker)) {
          uniqueSpeakers.push(speaker);
        }

        // rejoin the other words
        rest = rest.join(":");

        // get rid of special characters
        rest = rest.replace(/[^a-zA-Z0-9. ]+/g, "");

        // split into individual words
        rest = rest.split(" ");

        // remove any empty strings
        rest = rest.filter((item) => item);

        sectionObj.lines.push({speaker: speaker, line: rest});

      }
    }

    // if done
    if (sectionObj.lines.length > 0) {
      script.push(sectionObj);
    }

    return { speakers: uniqueSpeakers, script: script };
  };

  // switches the speaker that the user wants
  handleSelectSpeaker = (event) => {
    this.setState({
      selectedSpeaker: event.target.value,
    });
  };

  // sends practice config back to parent component, App.js
  beginPractice = () => {
    let config = {
      script: this.state.script,
      speakers: this.state.speakers,
      selectedSpeaker: this.state.selectedSpeaker,
    };

    this.props.setupPractice(config);
    this.props.switchScreen(SCREENS.practice);
  };

  getScriptPreview() {
    return (<div>
      {this.state.script.map((sectionObj) => {
        return (
          <div>
            <List>
              <ListItem dense={true}>
                {/* Section Name */}
                <ListItemIcon>
                  <SectionIcon/>
                </ListItemIcon>
                <ListItemText>
                  {sectionObj.section}
                </ListItemText>
              </ListItem>

              {/* Lines of each Section */}
              {sectionObj.lines.map((lineObj) => {
                let weight = 
                lineObj.speaker === this.state.selectedSpeaker
                  ? "bold"
                  : "normal";

                return (
                  <ListItem dense={true}>
                    <ListItemText>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        style={{ fontWeight: weight }}
                      >
                        {lineObj.speaker}
                      </Typography>
                      <Typography style={{ fontWeight: weight }}>
                        {lineObj.line.join(" ") + "\n"}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
            <Divider/>
          </div>
        )
      })}
    </div>);
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
              endIcon={<NextIcon />}
              disabled={this.state.files.length !== 1}
              onClick={() => this.processText()}
            >
              Proceed
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
              endIcon={<CancelIcon />}
              onClick={() => this.cancelFileUpload()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<NextIcon />}
              onClick={() => this.beginPractice()}
              disabled={this.state.selectedSpeaker === ""}
            >
              Begin
            </Button>
          </div>
        );
      default:
        return (<div>default</div>);
    }
  }

  getArena() {
    switch (this.state.step) {
      case UPLOAD_STEPS.upload:
        return (
          <div>
            <DropzoneArea
              onChange={(files) => this.updateFiles(files)}
              acceptedFiles={[".txt"]}
              filesLimit={1}
              dropzoneText={
                "Drag and drop your script (.txt files only) or click here"
              }
            />
          </div>
        );
      case UPLOAD_STEPS.parse:
        return (
          <div>
            <CircularProgress />
            <br />
            Your file is being processed.
          </div>
        );
      case UPLOAD_STEPS.select:
        return (
          <div>
            <Paper
              elevation={4}
              style={{ margin: "2vh", maxHeight: "60vh", overflow: "auto" }}
            >
              {this.getScriptPreview()}
            </Paper>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <br />
              <FormControl style={{ minWidth: 200 }}>
                <InputLabel id="select-speaker-label">
                  Select Your Role
                </InputLabel>
                <Select
                  labelId="select-speaker"
                  id="select-speaker"
                  value={this.state.selectedSpeaker}
                  onChange={this.handleSelectSpeaker}
                >
                  {this.state.speakers.map((speaker) => {
                    return (
                      <MenuItem value={speaker} key={speaker}>
                        {speaker}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
        );
      default:
        return <div></div>;
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
