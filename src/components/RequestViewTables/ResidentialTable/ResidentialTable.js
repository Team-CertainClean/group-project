import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { REQUEST_ACTIONS } from '../../../redux/actions/requestActions';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Icon, IconButton } from '@material-ui/core';
import { Card, CardContent} from '@material-ui/core';

// Component Imports 
import ResidentialTableRow from './ResidentialTableRow';

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
        marginTop: 25
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

class ResidentialTable extends React.Component{
    constructor(){
        super();
        this.state = {
            requests: [],
            filter: '',
            sort: {
                orderParam: '',
                sortBy: '',
            },
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.requests){
            this.setState({requests: [...nextProps.requests]});
        }
    }

    handleFilter = (event) => {
        this.setState({filter: event.target.value});
        this.filterRooms(event.target.value);
    }

    closeRequest = (id) => {
        console.log(`in closeRequest`, id)
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
        await this.setState({
            sort: {
                orderParam: thing,
                sortBy: 'ASC'
            }
        })
        console.log(`this.state.sort`, thing)
        await this.props.dispatch({type: REQUEST_ACTIONS.FETCH, payload: this.state.sort})
    }

    render(){
        console.log("Render Table");
        const { classes } = this.props;
        let table = null;
        console.log(`in residentialTable`, this.state.requests);
        if(this.state.requests){
            table = (
                <div>
                    <Card >
                        <CardContent>
                        <Table >
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Request ID<IconButton onClick={() => this.sort('request.id')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell>Customer<IconButton onClick={() => this.sort('last_name')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell>Customer Email<IconButton onClick={() => this.sort('email')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell>Web Estimate<IconButton onClick={() => this.sort('est_duration')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell className={classes.tableCell}>Cleaning Type<IconButton onClick={() => this.sort('cleaning_type')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell>Cleanliness</TableCell>
                                    <TableCell>Requested Time<IconButton onClick={() => this.sort('start')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell>Status<IconButton onClick={() => this.sort('status')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.residential.map((request, i) => {
                                    return(
                                        <ResidentialTableRow key={i} rowData={request} closeRequest={this.closeRequest} updateRequest={this.updateRequest} />
                                    );
                                })}
                            </TableBody>
                        </Table>
                        </CardContent>
                    </Card>
                </div>
            );
        }
        return(
            <div >
                <div>
                    <Typography variant="title" style={{textAlign: 'center'}}>Residential</Typography>
                </div>
                <Card className={classes.tableCard}>
                    <CardContent>
                        { table }
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(ResidentialTable);


