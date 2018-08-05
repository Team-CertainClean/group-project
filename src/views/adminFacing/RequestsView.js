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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


// Component Imports
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { compose } from 'redux';
import Nav from '../../components/Nav/Nav';
import { REQUEST_ACTIONS } from '../../redux/actions/requestActions';
import RequestViewTableRow from '../../components/RequestsViewTableRow/RequestsViewTableRow';


const styles = theme => ({
      button: {
          backgroundColor: '#EF8902',
      },
      title: {
          marginTop: '50px',

      }
});

const mapStateToProps = state => ({
  user: state.user,
  request: state.request,

});

class RequestsView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            res: true,
        }
    }
    
    componentDidMount() {
        this.props.dispatch({ type: REQUEST_ACTIONS.FETCH });
      }

    toggleRes = () => {
        this.setState({
            res: true
        })
    }

    toggleCom = () => {
        this.setState({
            res: false
        })
    }

    render(){
        let table = null;
        let buttons = null;
        let nav = null;
        const { classes } = this.props;
    
        if (this.props.user.userName) {
                buttons = (
                    <div>
                        <Button onClick={ this.toggleRes } className={classes.button}>Residential</Button>
                        <Button onClick={ this.toggleCom } className={classes.button}>Commercial</Button>
                    </div>
                );
                if (this.state.res === true){
                table = (
                    <div>
                        <Typography variant="display2" className={classes.title}>Residential Things on this page</Typography>
                        <Card >
                            <CardContent>
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
                                    {this.props.request.map(request => {
                                        return(
                                            <RequestViewTableRow rowData={request} />
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            </CardContent>
                        </Card>
                        <div></div>
                    </div>
                );
            } else {
                table = (
                    <div>
                        <div>
                            <Typography variant="display2" className={classes.title}>Commercial Things on this page</Typography>
                            <Card>
                                <CardContent>
                                    <Table className={classes.table}>
                                        <TableHead className={classes.tableHeader}>
                                            <TableRow>
                                                <TableCell>Request ID</TableCell>
                                                <TableCell>Customer Name</TableCell>
                                                <TableCell>Customer Email</TableCell>
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
                                </CardContent>
                            </Card>
                        </div>
                        <div></div>
                    </div>
                )
            }
        }
    
        return(
            <div style={{'width': '100vw', 'position': 'relative', 'left': -8}}>
                <Nav history={this.props.history} />
                <div>
                    { table }
                </div>
                <div>
                    { buttons }
                </div>
            </div>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(RequestsView);