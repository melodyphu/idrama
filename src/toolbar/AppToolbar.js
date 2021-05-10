import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import "../toolbar/toolbarstyle.css"

const styles = {
  root: {
    flexGrow: 1,
  },
  // appbar: {
  //   backgroundColor: COLORS['purple'],
  // },
};

class AppToolbar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
      }
    }
  
    // called the first time the component is rendered by App.js
    componentDidMount() {
      this.setState({
  
      })
    }
  
    render() {
        return (
            <div className={styles.root}>
              <AppBar color="primary" position="static" min-height="100px">
                <Toolbar className="Logo">
                    <h1><span>i</span>Drama</h1>
                </Toolbar>
              </AppBar>
            </div>
        );
    }
  }
  
  export default AppToolbar;