import React from 'react';

import {SCREENS} from './../constants/Navigation';

import TotalScore from "./TotalScore";
import SectionScore from "./SectionScore";

import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

class Summary extends React.Component {
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
      <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <TotalScore
            score={this.props.score}
          />
          <SectionScore
            script={this.props.script}
          />
        </div>
        <br/>
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
    )
  }
}

export default Summary;
