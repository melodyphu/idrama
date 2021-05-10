import React from "react";

import { SCREENS } from "./../constants/Navigation";
import MemorizationAid from "./MemorizationAid";
import VideoCapture from "./VideoCapture";
import Tips from "./Tips";
import COLORS from "./../constants/Colors";

import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, LinearProgress, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BackIcon from "@material-ui/icons/ArrowBack";
import FinishIcon from "@material-ui/icons/Done";
import HandIcon from "@material-ui/icons/PanTool";
import FaceIcon from "@material-ui/icons/Face";
import AudioIcon from '@material-ui/icons/GraphicEq';

import * as handTrack from 'handtrackjs';

import "./practice.css";

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 15,
    borderRadius: 7.5
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 7.5,
    backgroundColor: COLORS.turquoise,
  }
}))(LinearProgress);

const styles = {
  halfPaper: {
    margin: "2vh",
    overflow: "auto",
    height: "47vh",
    width: "40vw",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  textPaper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "15vh",
    overflow: "auto",
    justifyContent: "center",
  },
  icon: {
    color: COLORS.turquoise,
    fontSize: 45,
    flexGrow: 1,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-evenly",
    minWidth: "6vw",
  }
}

class PracticeArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      script: [],
      speakers: [],
      totalLineCount: 0,
      selectedSpeaker: "",
      sectionIdx: 0,
      lineIdx: 0,
      currentSpeaker: 0,
      help: false, // whether or not iDrama should
      message: "click enable to start",
      handRaised: false,
      faceVisible: false,
      isSpeaking: false,
    };
    this.webcamRef = React.createRef();
  }

  // called once the component receives the practice options
  componentDidMount() {
    let { script, speakers, selectedSpeaker, totalLineCount } = this.props.practiceConfig;

    handTrack.load().then(model => {
      this.setState({
        script: script,
        speakers: speakers,
        selectedSpeaker: selectedSpeaker,
        totalLineCount: totalLineCount,
        model: model,
      });
    })
  }

  setSpeaking = (value) => {
    this.setState({
      isSpeaking: value,
    })
  }

  setMessage = (text) => {
    this.setState({
      message: text
    });
  }

  setLineIdx = (value) => {
    this.setState({
      lineIdx: value
    })
  }

  setSectionIdx = (value) => {
    this.setState({
      sectionIdx: value,
    })
  }

  handleRaiseHand = (value) => {
    this.setState({
      handRaised: value,
    })
  }

  handleShowFace = (value) => {
    this.setState({
      faceVisible: value,
    })
  }

  getGlobalLineIdx = () => {
    let total = 0;
    for (let i = 0; i < this.state.sectionIdx; i++) {
      total += this.state.script[i].lines.length;

    }
    return total += this.state.lineIdx;
  }

  // only rendered when the system is rendered
  getPracticeArena = () => {
    var progressValue = this.getGlobalLineIdx() / this.state.totalLineCount * 100;

    return (
      <div align="center">
        <br/>
        <Typography variant='subtitle1' style={{fontStyle: 'italic'}}>
          {"Issue a command by starting saying iDrama <command> or raising your hand above your head, palm facing forward"}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Paper
            elevation={3}
            style={styles.halfPaper}
          >
            <VideoCapture
              handleRaiseHand={this.handleRaiseHand}
              handleShowFace={this.handleShowFace}
              raisedHand={this.state.raisedHand}
              faceVisible={this.state.faceVisible}
            />
            <div style={styles.iconContainer}>
              {this.state.faceVisible && (
                <Tooltip title="face is visible">
                  <FaceIcon
                    style={styles.icon}
                  />
                </Tooltip>
              )}
              {this.state.isSpeaking && (
                <Tooltip title="hand is raised">
                  <AudioIcon
                    style={styles.icon}
                  />
                </Tooltip>
              )}
              {this.state.handRaised && (
                <Tooltip title="hand is raised">
                  <HandIcon
                    style={styles.icon}
                  />
                </Tooltip>
              )}
            </div>

          </Paper>
          <Paper
            elevation={3}
            style={styles.halfPaper}
          >
            <Tips />
          </Paper>
        </div>
        <div style={{ padding: "1vh 2vh 2vh" }}>
          <BorderLinearProgress variant="determinate" value={progressValue}/>
          <Paper
            elevation={3}
            style={styles.textPaper}
          >
            <Typography
              variant="h6"
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
        <br/>
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
          {this.state.script.length > 0 && (
            <MemorizationAid
              setMessage={this.setMessage}
              setLineIdx={this.setLineIdx}
              setSectionIdx={this.setSectionIdx}
              script={this.state.script}
              totalLineCount={this.state.totalLineCount}
              speakers={this.state.speakers}
              selectedSpeaker={this.state.selectedSpeaker}
              handRaised={this.state.handRaised}
              setSpeaking={this.setSpeaking}
              addToScore={this.props.addToScore}
            />
          )}
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
