import React from 'react';

import { SCREENS } from './../constants/Navigation';

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import "../tutorial/tutorial.css"

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
      <div className="Holder">
        <div className="Top">
          <h1><span>~This tutorial page is under construction~</span></h1>
        </div>

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
        </div>
      </div>
    );
  }
}

export default Tutorial;
