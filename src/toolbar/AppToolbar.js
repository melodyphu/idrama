import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={styles.title}>
                    iDrama
                  </Typography>
                </Toolbar>
              </AppBar>
            </div>
        );
    }
  }
  
  export default AppToolbar;