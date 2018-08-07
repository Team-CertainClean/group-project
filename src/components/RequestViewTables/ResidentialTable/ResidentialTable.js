import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ROOM_ACTIONS } from '../../../redux/actions/roomActions';
import { REQUEST_ACTIONS } from '../../../redux/actions/requestActions';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

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

    submitRoom = () => {
        this.props.dispatch({type: ROOM_ACTIONS.POST, payload: this.state.roomInfo});
        this.clearInputs();
    }

    removeRoom = (id) => {
        this.props.dispatch({type: ROOM_ACTIONS.REMOVE, payload: id});
    }

    clearInputs = () => {
        this.setState({roomInfo: {room_name: '', location_type_id: 0, cleanliness_metrics: {one: null, two: null, three: null, four: null, five: null}}});
    }

    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{

            }catch(error){
                reject();
            }
        });
    }

    // filterRooms = (filter) => {
    //     switch(filter){
    //         case 'Residential':
    //             this.setState({rooms: [...this.props.rooms.filter(room => Number(room.location_type_id) === 1)]});
    //             break;
    //         case 'Commercial':
    //             this.setState({rooms: [...this.props.rooms.filter(room => Number(room.location_type_id) === 2)]});
    //             break;
    //         default:
    //             this.setState({rooms: [...this.props.rooms]});
    //             break;
    //     }
    // }

    // idAscendingSort(a, b){
    //     console.log('Ascending');
    //     console.log('A: ', a);
    //     console.log('B: ', b);
    //     return Number(a.id) - Number(b.id);
    // }

    // idDescendingSort(a, b){
    //     console.log('Descending');
    //     return Number(b.id) - Number(a.id);
    // }

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

    // sortRooms = (sort) => {
    //     console.log(sort);
    //     switch(sort){
    //         case 'id':
    //             this.state.sort ? this.setState({rooms: [...this.props.rooms.sort(this.idAscendingSort)], sort: !this.state.sort}) : this.setState({rooms: [...this.props.rooms.sort(this.idDescendingSort)], sort: !this.state.sort});
    //             break;
    //         case 'room_name':
    //             this.state.sort ? this.setState({rooms: [...this.alphabeticalSort()], sort: !this.state.sort}) : this.setState({rooms: [...this.reverseAlphabeticalSort()], sort: !this.state.sort});
    //             break;
    //         case 'location_type_id':
    //             this.state.sort ? this.setState({rooms: [...this.locationSort()], sort: !this.state.sort}) : this.setState({rooms: [...this.locationSort()], sort: !this.state.sort});
    //             break;
    //         default:
    //             this.setState({rooms: [...this.props.rooms]});
    //     }
    // }

    handleFilter = (event) => {
        this.setState({filter: event.target.value});
        this.filterRooms(event.target.value);
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
                                    <TableCell className={classes.tableCell}>Request ID</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell>Customer Email</TableCell>
                                    <TableCell>Web Estimate</TableCell>
                                    <TableCell className={classes.tableCell}>Cleaning Type</TableCell>
                                    <TableCell>Room</TableCell>
                                    <TableCell>Requested Time</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.residential.map((request, i) => {
                                    return(
                                        <ResidentialTableRow key={i} rowData={request} closeEvent={this.closeEvent} />
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
            <div style={{'width': '100vw', 'position': 'relative', 'left': -8}}>
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


{/* <Button onClick={() => this.sortRooms('id')}></Button>
<Button onClick={() => this.sortRooms('serviceType')}>Cleaning Type</Button>
<Button onClick={() => this.sortRooms('status')}>Status</Button> */}