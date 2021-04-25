import React from 'react';

import {SCREENS} from './../constants/Navigation';

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

class Tutorial extends React.Component {
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
          This is the Tutorial screen.
        </div>
        <Button
        variant="contained"
        color="primary"
        size="large"
        endIcon={<HomeIcon />}
        onClick={() => this.props.switchScreen(SCREENS.home)}
        >
          Home
        </Button>
      </div>
    );
  }
}

export default Tutorial;
