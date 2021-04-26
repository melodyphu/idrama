import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import COLORS from "../constants/Colors";
import "../toolbar/toolbarstyle.css"


const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

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