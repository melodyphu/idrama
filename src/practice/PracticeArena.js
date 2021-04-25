import React from 'react';

import {SCREENS} from './../constants/Navigation';

import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import FinishIcon from '@material-ui/icons/Done';

class PracticeArena extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  // called the first time this component is rendered
  componentDidMount() {
    this.setState({

    })
  }

  render() {
    return (
      <div> 
        <div>
          This is the Practice Arena.
        </div>
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
