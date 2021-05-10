import React from 'react';

import {SCREENS} from './../constants/Navigation';
import {COMMAND_NAMES} from "./../constants/Speech";
import Paper from "@material-ui/core/Paper"
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

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
      <div align="center" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Paper
          elevation={4}
          style={{ margin: "2vh", maxHeight: "60vh", overflow: "auto" }}
        >
          <div style={{overflow: "auto"}}>
            <TableContainer>
                <Table style={{ width: '39vw' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant='subtitle2' color='primary'>
                                    Command
                    </Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Typography variant='subtitle2' color='primary'>
                                    # of Times Used
                    </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {COMMAND_NAMES.map((name) => (
                            <TableRow key={name}>
                                <TableCell component="th" scope="row">
                                    {name}
                                </TableCell>
                                <TableCell align="right">
                                    {this.props.score[name]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
          </div>
        </Paper>
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
    );
  }
}

export default Summary;
