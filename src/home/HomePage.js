import React from "react";

import { SCREENS } from "./../constants/Navigation";

import Button from "@material-ui/core/Button";
import StartIcon from "@material-ui/icons/PlayArrow";
import HelpIcon from "@material-ui/icons/Help";

import "../home/homestyle.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Holder">
        <div className="Top"></div>
        <div className="Bottom">
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<StartIcon />}
            onClick={() => this.props.switchScreen(SCREENS.upload)}
          >
            Start
          </Button>

          {/* <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<HelpIcon />}
            onClick={() => this.props.switchScreen(SCREENS.tutorial)}
          >
            Help
          </Button> */}
        </div>
      </div>
    );
  }
}

export default HomePage;
