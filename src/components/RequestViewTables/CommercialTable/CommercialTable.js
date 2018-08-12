import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Icon, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';


// Component Imports 
import CommercialTableRow from './CommercialTableRow';
import { REQUEST_ACTIONS } from '../../../redux/actions/requestActions';

const styles = theme => ({
    button: {
        backgroundColor: '#EF8902',
    },
    title: {
        marginTop: '50px',
    },
    tableCell: {
        padding: 'none',
        width: 'auto',
    },
    tableCard: {
        marginTop: '25px',
    },
    estimatorControlComponent: {
        textAlign: 'center',
        padding: 15,
        paddingBottom: 0
    },
    tableHeader: {
        backgroundColor: 'rgba(77, 71, 66)',
        '& *': {
            color: 'white'
        }
    },
    row: {
        '&:nth-of-type(even)': {
            backgroundColor: 'rgba(160, 156, 153)'
        },
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    }
});

const mapStateToProps = state => ({
    requests: state.request,
});

class CommercialTable extends React.Component{
    constructor(){
        super();
        this.state = {
            requests: [],
            sort: {
                orderParam: 'status',
                sortBy: 'DESC',
            },
        };

    };

    componentWillReceiveProps(nextProps){
        if(nextProps.rooms){
            this.setState({rooms: [...nextProps.rooms]});
        }
    }

    closeRequest = (id) => {
        this.props.dispatch({type: REQUEST_ACTIONS.CLOSE, payload: id})
    }

    updateRequest = (payload) => {
        console.log(`update payload`, payload)
        let newStatus = payload.status 
        newStatus++
        let newPayload = { newStatus: newStatus, payload }
        console.log(`newPayload`, newPayload)
        this.props.dispatch({type: REQUEST_ACTIONS.UPDATE, payload: newPayload})
    }

    async sort(thing){
        if (this.state.sort.sortBy === 'ASC'){
          await this.setState({
              sort: {
                  orderParam: thing,
                  sortBy: 'DESC'
              }
          })
      } else if(this.state.sort.sortBy === 'DESC') {
          await this.setState({
              sort: {
                  orderParam: thing,
                  sortBy: 'ASC'
              }
          })
      }
          console.log(`this.state.sort`, this.state.sort)
          await this.props.dispatch({type: REQUEST_ACTIONS.FETCH, payload: this.state.sort})
      }

    render(){
        console.log("Render Table");
        const { classes } = this.props;
        let table = null;
        console.log(this.state.requests);
        if(this.state.requests){
            table = (
                <div>
                    <div>
                        <Card>
                            <CardContent>
                                <Table className={classes.table}>
                                    <TableHead className={classes.tableHeader}>
                                        <TableRow>
                                            <TableCell>Request ID<IconButton onClick={() => this.sort('request.id')}><Icon>sort</Icon></IconButton></TableCell>
                                            <TableCell>Customer Name<IconButton onClick={() => this.sort('last_name')}><Icon>sort</Icon></IconButton></TableCell>
                                            <TableCell>Customer Email<IconButton onClick={() => this.sort('email')}><Icon>sort</Icon></IconButton></TableCell>
                                            {/* <TableCell>Cleanliness <IconButton onClick={() => this.sort('est_duration')}><Icon>sort</Icon></IconButton></TableCell> */}
                                            {/* <TableCell>Requested Time<IconButton onClick={() => this.sort('start')}><Icon>sort</Icon></IconButton></TableCell> */}
                                            <TableCell>Status<IconButton onClick={() => this.sort('status')}><Icon>sort</Icon></IconButton></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.commercial.map((request, i) => {
                                            return(
                                                <CommercialTableRow key={i} rowData={request} closeRequest={this.closeRequest} updateRequest={this.updateRequest} />
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
        }
        return(
            <div>
                <Typography variant="title" style={{textAlign: 'center'}}>Commercial</Typography>
                <Card className={classes.tableCard}>
                    <CardContent>
                        {table}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(CommercialTable);