import React from 'react';
import axios from 'axios';


// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '../../../node_modules/@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// Component Imports
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { compose } from 'redux';
import Nav from '../../components/Nav/Nav';
import { REQUEST_ACTIONS } from '../../redux/actions/requestActions';


const styles = theme => ({
      button: {
          backgroundColor: '#EF8902',
      },

});

const mapStateToProps = state => ({
  user: state.user,
  bigRequest: state.bigRequest,

});

class RequestsView extends React.Component{
    
    componentDidMount() {
        this.props.dispatch({ type: REQUEST_ACTIONS.FETCH });
      }

    render(){
        let content = null;
        const { classes } = this.props;
    
        if (this.props.user.userName) {
                content = (
                    <div>
                        <div>
                            <Nav />
                        </div>
                        <br />
                        <div>
                            <Typography variant="display2">Request Things on this page</Typography>
                            <Table className={classes.table}>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell>Request</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Customer Email</TableCell>
                                        <TableCell>Web Estimate</TableCell>
                                        <TableCell>Service Type</TableCell>
                                        <TableCell>Room</TableCell>
                                        <TableCell>Requested Time</TableCell>
                                        <TableCell>Assigned Cleaner</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {this.props.cleaners.map(cleaner => {
                                        return(
                                            <EditableTableRow rowData={cleaner} remove={this.removeCleaner} actions={CLEANER_ACTIONS}/>
                                        );
                                    })} */}
                                </TableBody>
                            </Table>
                        </div>
                        <div></div>
                    </div>
                );
        }
    
        return(
            <Paper>
                { content }
            </Paper>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(RequestsView);