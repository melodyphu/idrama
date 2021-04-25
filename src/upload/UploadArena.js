import React from 'react';

import {SCREENS} from './../constants/Navigation';

import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Close';
import NextIcon from '@material-ui/icons/ArrowForward';

class UploadArena extends React.Component {
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
          This is the Upload Arena screen.
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<CancelIcon />}
          onClick={() => this.props.switchScreen(SCREENS.home)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<NextIcon />}
          onClick={() => this.props.switchScreen(SCREENS.practice)}
        >
          Begin
        </Button>
      </div>

    );
  }
}

export default UploadArena;
