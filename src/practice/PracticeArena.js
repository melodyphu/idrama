import React from 'react';

// documentation: https://www.npmjs.com/package/react-webcam
import Webcam from "react-webcam";

import {SCREENS} from './../constants/Navigation';

import Typography from '@material-ui/core/Typography';

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

  // only rendered when the system is ready
  getPracticeArena = () => {
    return (
      <div>
        <Typography variant="h2" align='center'>Practice</Typography>
        <Webcam/>
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
