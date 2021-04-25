import logo from './logo.svg';
import React from 'react';

import './App.css';
import {SCREENS} from './constants/Navigation';
import COLORS from './constants/Colors';

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

  handleSwitchScreen(value) {
    this.setState({
      screen: SCREENS[value]
    })
  }

  getScreen(screen) {
    switch (screen) {
      case SCREENS.tutorial: return (<Tutorial />);
      case SCREENS.home: return (<HomePage/>);
      case SCREENS.upload: return (<UploadArena/>);
      case SCREENS.practice: return (<PracticeArena/>);
      case SCREENS.summary: return (<Summary/>);
    }
  }

  render() {
    return (
      <div>
        <div className="App">
          <AppToolbar/>
        </div>
        <div className="Screen">
          {this.getScreen(this.state.screen)}
        </div>
      </div>

    );
  }
}

export default App;
