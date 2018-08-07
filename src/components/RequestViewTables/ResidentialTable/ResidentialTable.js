import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ROOM_ACTIONS } from '../../../redux/actions/roomActions';
import { REQUEST_ACTIONS } from '../../../redux/actions/requestActions';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Icon, IconButton } from '@material-ui/core';
import { Card, CardContent} from '@material-ui/core';

// Component Imports 
import ResidentialTableRow from './ResidentialTableRow';
// import { EstimatorControlStyles } from '../../EstimatorControlTables/styles';

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
            anchor: null,
            requests: [],
            filter: '',
            sort: false
        }
    }

    componentDidMount(){
        this.props.dispatch({ type: REQUEST_ACTIONS.FETCH });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.requests){
            this.setState({requests: [...nextProps.requests]});
        }
    }


    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{

            }catch(error){
                reject();
            }
        });
    }

    idAscendingSort(a, b){
        console.log('Ascending');
        console.log('A: ', a.request_info.request_id);
        console.log('B: ', b.request_info.request_id);
        return Number(a.request_id) - Number(b.request_id);
    }

    idDescendingSort(a, b){
        console.log('Descending');
        return Number(b.request_id) - Number(a.request_id);
    }

    // alphabeticalSort(){
    //     let roomNames = this.props.rooms.map(room => room.room_name);
    //     let sortedByName = roomNames.sort();
    //     for(let room of this.props.rooms){
    //         let sortedIndex = sortedByName.indexOf(room.room_name);
    //         sortedByName[sortedIndex] = room;
    //     }
    //     console.log('Alphabetical sort: ', sortedByName);
    //     return sortedByName;
    // }

    // reverseAlphabeticalSort(){
    //     let roomNames = this.props.rooms.map(room => room.room_name).sort();
    //     let reverseSortedByName = [];
    //     for(let name of roomNames){
    //         reverseSortedByName.unshift(name);
    //     }
    //     for(let room of this.props.rooms){
    //         let sortedIndex = reverseSortedByName.indexOf(room.room_name);
    //         reverseSortedByName[sortedIndex] = room;
    //     }
    //     return reverseSortedByName;
    // }

    // locationSort(){
    //     let residential = this.props.rooms.filter(room => Number(room.location_type_id) === 1);
    //     let commercial = this.props.rooms.filter(room => Number(room.location_type_id) === 2);
    //     if(this.state.sort){
    //         return [...residential, ...commercial];
    //     } else {
    //         return [...commercial, ...residential];
    //     }
    // }

    sortRooms = (sort) => {
        console.log(sort);
        console.log(`blah`, this.props.requests)
        switch(sort){
            case 'id':
                this.state.sort ? this.setState({requests: [...this.props.requests.sort(this.idAscendingSort)], sort: !this.state.sort}) : this.setState({rrequests: [...this.props.requests.sort(this.idDescendingSort)], sort: !this.state.sort});
                break;
            case 'status':
                this.state.sort ? this.setState({requests: [...this.alphabeticalSort()], sort: !this.state.sort}) : this.setState({requests: [...this.reverseAlphabeticalSort()], sort: !this.state.sort});
                break;
            default:
                this.setState({rooms: [...this.props.rooms]});
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
                                    <TableCell className={classes.tableCell}>Request ID<IconButton onClick={() => this.sortRooms('id')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Customer Email</TableCell>
                                    <TableCell>Web Estimate</TableCell>
                                    <TableCell className={classes.tableCell}>Cleaning Type</TableCell>
                                    <TableCell>Room</TableCell>
                                    <TableCell>Requested Time</TableCell>
                                    <TableCell>Status<IconButton onClick={() => this.sortRooms('status')}><Icon>sort</Icon></IconButton></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.residential.map((request, i) => {
                                    return(
                                        <ResidentialTableRow key={i} rowData={request} closeRequest={this.closeRequest} />
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


