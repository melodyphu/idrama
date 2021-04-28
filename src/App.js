import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import {SCREENS} from './constants/Navigation';
import AppToolbar from './toolbar/AppToolbar';
import Tutorial from './tutorial/Tutorial';
import HomePage from './home/HomePage';
import UploadArena from './upload/UploadArena';
import PracticeArena from './practice/PracticeArena';
import Summary from './summary/Summary';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: SCREENS.home,
      practiceConfig: {}
    }
  }

  setupPractice = (config) => {
    const {lines, speakers, selectedSpeaker} = config;

    console.log(config);
    this.setState({
      practiceConfig: {
        lines: lines,
        speakers: speakers,
        selectedSpeaker: selectedSpeaker,
      }
    })
  }

  handleSwitchScreen = (value) => {
    this.setState({
      screen: value
    });
  }

  getScreen = () => {
    switch (this.state.screen) {
      case SCREENS.tutorial: 
        return (
          <Tutorial 
            switchScreen={this.handleSwitchScreen}
          />
        );
      case SCREENS.home: 
        return (
          <HomePage 
            switchScreen={this.handleSwitchScreen}
          />
        );
      case SCREENS.upload: 
        return (
          <UploadArena 
            switchScreen={this.handleSwitchScreen}
            setupPractice={this.setupPractice}
          />
        );
      case SCREENS.practice: 
        return (
          <PracticeArena 
            switchScreen={this.handleSwitchScreen}
            practiceConfig={this.state.practiceConfig}
          />
        );
      case SCREENS.summary: 
        return (
          <Summary 
            switchScreen={this.handleSwitchScreen}
          />
        );
    }
  }

  render() {
    return (
      <Router>
        <div>
          <AppToolbar/>
          {this.getScreen()}
        </div>
      </Router>

    );
  }
}

export default App;
