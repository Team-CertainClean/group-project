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
import ResidentialTableRow from '../../components/ResidentialTableRow/ResidentialTableRow';
import CommercialTableRow from '../../components/CommercialTableRow/CommercialTableRow';


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
            main: 'residential',
        }
    }
    
    componentDidMount() {
        this.props.dispatch({ type: REQUEST_ACTIONS.FETCH });
      }

    toggleRes = () => {
        this.setState({
            main: 'residential'
        })
    }

    toggleCom = () => {
        this.setState({
            main: 'commercial'
        })
    }

    render(){
        let mainTable = null;
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

                if (this.state.main === true){
                mainTable = (
                    <div>
                        <Typography variant="display2" className={classes.title}>Residential Things on this page</Typography>
                        <Card >
                            <CardContent>
                            <Table className={classes.table}>
                                <TableHead className={classes.tableHeader}>
                                    <TableRow>
                                        <TableCell>Request ID</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Customer Email</TableCell>
                                        <TableCell>Web Estimate</TableCell>
                                        <TableCell>Service Type</TableCell>
                                        <TableCell>Room</TableCell>
                                        <TableCell>Requested Time</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.request.map((request, i) => {
                                        return(
                                            <ResidentialTableRow key={i} rowData={request} />
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
                mainTable = (
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
                                                <TableCell>Status</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.props.request.map((request, i) => {
                                                return(
                                                    <CommercialTableRow key={i} rowData={request} />
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                        <div></div>
                    </div>
                )
            }// end of residential/commercial table
        }
    
        return(
            <div style={{'width': '100vw', 'position': 'relative', 'left': -8}}>
                <Nav history={this.props.history} />
                <div>
                    { mainTable }
                </div>
                <div>
                    { buttons }
                </div>
            </div>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(RequestsView);