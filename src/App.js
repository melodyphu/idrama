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
    }
  }

  handleSwitchScreen = (value) => {
    this.setState({
      screen: value
    });
  }

  getScreen = () => {
    switch (this.state.screen) {
      case SCREENS.tutorial: 
        return (<Tutorial switchScreen={this.handleSwitchScreen}/>);
      case SCREENS.home: 
        return (<HomePage switchScreen={this.handleSwitchScreen}/>);
      case SCREENS.upload: 
        return (<UploadArena switchScreen={this.handleSwitchScreen}/>);
      case SCREENS.practice: 
        return (<PracticeArena switchScreen={this.handleSwitchScreen}/>);
      case SCREENS.summary: 
        return (<Summary switchScreen={this.handleSwitchScreen}/>);
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
