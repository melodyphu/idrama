import React from 'react';

// documentation: https://www.npmjs.com/package/react-webcam
import Webcam from "react-webcam";

// tutorial: https://www.loginradius.com/blog/async/quick-look-at-react-speech-recognition/
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import {SCREENS} from './../constants/Navigation';
import {
  VOICE_COMAMNDS, 
  LINE_COMMANDS, 
  MESSAGE_TYPES,
  TIPS
} from "../constants/Speech";

import Tips from "./Tips";

import {Typography, Paper, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import FinishIcon from '@material-ui/icons/Done';

const classes = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const commands = [
  {
    command: 'iDrama start',
    callback: () => this.setState({active: true, lineIdx: 0})
  },
  {
    command: 'iDrama pause',
    callback: () => this.setState({active: false})
  },
  {
    command: 'iDrama stop',
    callback: () => this.setState({active: false}) // figure out what's different for these too!
  },
  {
    command: 'iDrama resume',
    callback: () => this.setState({active: true}) // figure out what's different for these too!
  },
  {
    command: 'iDrama restart',
    callback: () => this.setState({active: true, lineIdx: 0}) // figure out what's different for these too!
  },
  {
    command: 'iDrama next line',
    callback: () => {
      
      this.setMessage()
      this.setState({lineIdx: this.state.lineIdx + 1});
    } // figure out what's different for these too!
  },
  {
    command: 'iDrama repeat line',
    callback: () => this.setState({active: false}) // figure out what's different for these too!
  },
]

class PracticeArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      speakers: [],
      selectedSpeaker: '',
      active: false,
      lineIdx: -1,
      currentSpeaker: 0,
      help: false, // whether or not iDrama should 
    }
  }

  // called once the component receives the practice options
  componentDidMount() {
    let {lines, speakers, selectedSpeaker} = this.props.practiceConfig;

    this.setState({
      lines: lines,
      speakers: speakers,
      selectedSpeaker: selectedSpeaker,
    });

  }

  // checks if the person said "iDrama" plus a valid command
  isValidCommand = (command) => {
    
  }

  // TODO
  getCurrentLine = () => {
    let lineIdx = this.state.lineIdx;

    if (!this.state.speaking || lineIdx < 0 || lineIdx >= this.state.lines.length) {
      return "No speech detected";
    } 
      
    return this.state.lines[lineIdx].line.join(" ");

  }

  // only rendered when the system is rendered
  getPracticeArena = () => {
    return (
      <div width="80%" align="center">
        {/* <Typography variant="h2" align='center'>Practice</Typography> */}
        <br/>
        <div className="rowC">
          <div width="30%">
            <Webcam/>
          </div>
          <div width="30%">
            <Tips/>
          </div>
        </div>
        <div style={{padding: "2%"}}>
          <Paper variant="outlined" style={{width: "60%", height: 100}}>
            <Typography variant="h5">
              {this.getCurrentLine()}
            </Typography>
          </Paper>
        </div>

      </div>
    )
  }

  render() {
    return (
      <div> 
        {this.getPracticeArena()}
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
    );
  }
}

export default PracticeArena;
