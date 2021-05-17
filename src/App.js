import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import { SCREENS } from './constants/Navigation';
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
      practiceConfig: {},
      totalScore: {
        "previous line": 0,
        "line": 0,
        "next line": 0,
        "previous section": 0,
        "restart section": 0,
        "next section": 0,
        "from beginning": 0,  
      },
    }
  }

  // receiving lines, speakers, and selectedSpeaker from UploadArena
  setupPractice = (config) => {
    this.setState({
      practiceConfig: config,
    })
  }

  // for navigation buttons
  handleSwitchScreen = (value) => {
    this.setState({
      screen: value
    });
  }

  // increment a command score by 1
  addToScore = (command, sectionIdx, lineIdx) => {
    // add to overall score
    let {totalScore} = this.state;
    if (!(command in totalScore)) {
      totalScore[command] = 1;
    } else {
      totalScore[command] += 1;
    }

    this.setState({
      score: totalScore,
    })

    // add to specific section
    let practiceConfig = this.state.practiceConfig;
    let {script} = practiceConfig;
    let sectionObj = script[sectionIdx];

    if ("score" in sectionObj) {
      sectionObj.score[command] += 1;
    } else {
      sectionObj["score"] = {
        "previous line": 0,
        "line": 0,
        "next line": 0,
        "previous section": 0,
        "restart section": 0,
        "next section": 0,
        "from beginning": 0,
      }

      sectionObj.score[command] = 1;
    }

    // add to specific line
    let lineObj = sectionObj.lines[lineIdx];
    if ("score" in lineObj) {
      lineObj.score[command] += 1;
    } else {
      lineObj["score"] = {
        "previous line": 0,
        "line": 0,
        "next line": 0,
        "previous section": 0,
        "restart section": 0,
        "next section": 0,
        "from beginning": 0,
      }
      lineObj.score[command] = 1;
    }

    this.setState({
      practiceConfig: practiceConfig,
    })


    console.log(this.state.totalScore);
    console.log(this.state.practiceConfig)
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
            setScript={this.setScript}
          />
        );
      case SCREENS.practice:
        return (
          <PracticeArena
            switchScreen={this.handleSwitchScreen}
            practiceConfig={this.state.practiceConfig}
            addToScore={this.addToScore}
          />
        );
      case SCREENS.summary:
        return (
          <Summary
            switchScreen={this.handleSwitchScreen}
            score={this.state.totalScore}
            scriptScore={this.state.practiceConfig.script}
          />
        );
      default:
        return (<div></div>)
    }
  }

  render() {
    return (
      <Router>
        <div>
          <AppToolbar />
          {this.getScreen()}
        </div>
      </Router>

    );
  }
}

export default App;
