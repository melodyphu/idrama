import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { TIP_INFO } from './../constants/Speech';

class Tips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div style={{padding: '0vw 5vw'}}>
                <TableContainer>
                    <Table style={{ maxWidth: 720 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant='subtitle1' color='primary'>
                                        Command
                        </Typography>
                                </TableCell>
                                <TableCell align='right'>
                                    <Typography variant='subtitle1' color='primary'>
                                        Description
                        </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {TIP_INFO.map((row) => (
                                <TableRow key={row[0]}>
                                    <TableCell component="th" scope="row">
                                        {"\"" + row[0] + "\""}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row[1]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Tips;
