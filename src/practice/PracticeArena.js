import React, { useEffect, useState } from "react";

// documentation: https://www.npmjs.com/package/react-webcam
import Webcam from "react-webcam";

import { SCREENS } from "./../constants/Navigation";
import MemorizationAid from "./MemorizationAid";
import Tips from "./Tips";
import COLORS from "./../constants/Colors";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Paper, LinearProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ArrowBack";
import FinishIcon from "@material-ui/icons/Done";

import "./practice.css";

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: COLORS.turquoise,
  }
}))(LinearProgress);

class PracticeArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      speakers: [],
      selectedSpeaker: "",
      active: false,
      lineIdx: 0,
      currentSpeaker: 0,
      help: false, // whether or not iDrama should
      message: "click enable to start",
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

  setMessage = (text) => {
    this.setState({
      message: text
    });
  }

  setActive = (value) => {
    this.setState({
      active: value
    });
  }

  setLineIdx = (value) => {
    this.setState({
      lineIdx: value
    })
  }

  // only rendered when the system is rendered
  getPracticeArena = () => {
    var progressValue = this.state.lineIdx / this.state.lines.length * 100;

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
              maxHeight: "65vh",
              flexGrow: 1,
            }}
          >
            <Webcam 
              mirrored={true}
              height={400}
              width={600}
            />
          </Paper>
          <Paper
            elevation={3}
            style={{
              margin: "2vh",
              maxHeight: "65vh",
              overflow: "auto",
              flexGrow: 1,
            }}
          >
            <Tips />
          </Paper>
        </div>
        <div style={{ padding: "1vh 2vh 2vh" }}>
          <BorderLinearProgress variant="determinate" value={progressValue}/>
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
            <Typography
              variant="h5"
              style={{
                fontStyle:
                  this.state.currentSpeaker === this.state.selectedSpeaker
                    ? "normal"
                    : "italic",
              }}
            >
              {this.state.message}
            </Typography>
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
          {this.state.lines.length > 0 && (
            <MemorizationAid
              setMessage={this.setMessage}
              setActive={this.setActive}
              setLineIdx={this.setLineIdx}
              lines={this.state.lines}
              speakers={this.state.speakers}
              selectedSpeaker={this.state.selectedSpeaker}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<FinishIcon />}
            onClick={() => this.props.switchScreen(SCREENS.home)}
          >
            Finish
          </Button>
        </div>
      </div>
    );
  }
}

export default PracticeArena;
