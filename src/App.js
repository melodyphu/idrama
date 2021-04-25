import logo from './logo.svg';
import React from 'react';

import './App.css';

import AppToolbar from './toolbar/AppToolbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    this.setState({

    })
  }

  render() {
    return (
      <div className="App">
        <AppToolbar/>
      </div>
    );
  }
}

export default App;
