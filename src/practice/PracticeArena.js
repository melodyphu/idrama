import React from 'react';

// documentation: https://www.npmjs.com/package/react-webcam
import Webcam from "react-webcam";

import {SCREENS} from './../constants/Navigation';

import {Typography, Paper} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import FinishIcon from '@material-ui/icons/Done';

class PracticeArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      speakers: [],
      selectedSpeaker: '',
      ready: false,
      lineIdx: -1,
      speaking: false,
    }
  }

  // called once the component receives the practice options
  componentDidMount() {
    let {lines, speakers, selectedSpeaker} = this.props.practiceConfig;

    this.setState({
      lines: lines,
      speakers: speakers,
      selectedSpeaker: selectedSpeaker,
      ready: true
    });

  }

  // TODO
  getCurrentLine = () => {
    let lineIdx = this.state.lineIdx;

    if (!this.state.speaking || lineIdx < 0 || lineIdx >= this.state.lines.length) {
      return "No speech detected";
    } 
      
    return this.state.lines[lineIdx].line.join(" ");

  }

  // only rendered when the system is ready
  getPracticeArena = () => {
    return (
      <div width="60%" align="center">
        {/* <Typography variant="h2" align='center'>Practice</Typography> */}
        <br/>
        <Webcam/>
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
        {this.state.ready && this.getPracticeArena()}
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
