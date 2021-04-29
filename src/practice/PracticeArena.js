import React, { useEffect, useState } from "react";

// documentation: https://www.npmjs.com/package/react-webcam
import Webcam from "react-webcam";

// tutorial: https://www.loginradius.com/blog/async/quick-look-at-react-speech-recognition/
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { SCREENS } from "./../constants/Navigation";
import {
  VOICE_COMAMNDS,
  LINE_COMMANDS,
  MESSAGE_TYPES,
  TIPS,
} from "../constants/Speech";

import Tips from "./Tips";

import { Typography, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ArrowBack";
import FinishIcon from "@material-ui/icons/Done";

import "./practice.css";

class PracticeArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      speakers: [],
      selectedSpeaker: "",
      active: false,
      lineIdx: -1,
      currentSpeaker: 0,
      help: false, // whether or not iDrama should
      message: "no speech detected",
    };
  }

  // called once the component receives the practice options
  componentDidMount() {
    let { lines, speakers, selectedSpeaker } = this.props.practiceConfig;

    this.setState({
      lines: lines,
      speakers: speakers,
      selectedSpeaker: selectedSpeaker,
    });
  }

  // only rendered when the system is rendered
  getPracticeArena = () => {
    return (
      <div align="center">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            style={{
              margin: "2vh",
              overflow: "auto",
              maxHeight: "60vh",
              flexGrow: 1,
            }}
          >
            <Webcam mirrored={true} />
          </Paper>
          <Paper
            elevation={3}
            style={{
              margin: "2vh",
              maxHeight: "60vh",
              overflow: "auto",
              flexGrow: 1,
            }}
          >
            <Tips />
          </Paper>
        </div>
        <div style={{ padding: "1vh 2vh 2vh" }}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "12vh",
              overflow: "auto",
              justifyContent: "center",
            }}
          >
            <div>
              <Typography
                variant="h5"
                style={{
                  fontStyle:
                    this.state.currentSpeaker == this.state.selectedSpeaker
                      ? "normal"
                      : "italic",
                }}
              >
                {this.state.message}
              </Typography>
            </div>
          </Paper>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.getPracticeArena()}
        <div className="BottomPractice">
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<BackIcon />}
            onClick={() => this.props.switchScreen(SCREENS.upload)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<FinishIcon />}
            onClick={() => this.props.switchScreen(SCREENS.summary)}
          >
            Finish
          </Button>
        </div>
      </div>
    );
  }
}

export default PracticeArena;
