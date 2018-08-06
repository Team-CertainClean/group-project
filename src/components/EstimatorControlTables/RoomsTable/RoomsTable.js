import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ROOM_ACTIONS } from '../../../redux/actions/roomActions';
import { LOCATION_ACTIONS } from '../../../redux/actions/locationActions';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { EstimatorControlStyles } from '../styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

// Component Imports 
import AddRoomForm from './AddRoomForm';
import EditableTableRow from '../../EditableTableRow/EditableTableRow';

const mapStateToProps = store => ({
    locations: store.locations,
    rooms: store.rooms.roomOptions
});

class RoomControlTable extends React.Component{
    constructor(){
        super();
        this.state = {
            roomInfo: {
                room_name: '',
                location_type_id: 0,
                cleanliness_metrics: {
                    one: null,
                    two: null,
                    three: null,
                    four: null,
                    five: null
                }
            },
            anchor: null,
            rooms: [],
            filter: '',
            sort: false
        }
    }

    componentDidMount(){
        this.props.dispatch({type: LOCATION_ACTIONS.FETCH});
        this.props.dispatch({type: ROOM_ACTIONS.FETCH});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.rooms){
            this.setState({rooms: [...nextProps.rooms]});
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
                switch(event.target.id){
                    case 'one':
                    case 'two':
                    case 'three':
                    case 'four':
                    case 'five':
                        this.setState({roomInfo: {...this.state.roomInfo, cleanliness_metrics: {...this.state.roomInfo.cleanliness_metrics, [event.target.id]: event.target.value}}, anchor: null});
                        break;
                    default:
                        this.setState({roomInfo: {...this.state.roomInfo, [event.target.id]: event.target.value}});
                        break;
                    }
                resolve();
            }catch(error){
                reject();
            }
        });
    }

    filterRooms = (filter) => {
        switch(filter){
            case 'Residential':
                this.setState({rooms: [...this.props.rooms.filter(room => Number(room.location_type_id) === 1)]});
                break;
            case 'Commercial':
                this.setState({rooms: [...this.props.rooms.filter(room => Number(room.location_type_id) === 2)]});
                break;
            default:
                this.setState({rooms: [...this.props.rooms]});
                break;
        }
    }

    idAscendingSort(a, b){
        console.log('Ascending');
        console.log('A: ', a);
        console.log('B: ', b);
        return Number(a.id) - Number(b.id);
    }

    idDescendingSort(a, b){
        console.log('Descending');
        return Number(b.id) - Number(a.id);
    }

    alphabeticalSort(){
        let roomNames = this.props.rooms.map(room => room.room_name);
        let sortedByName = roomNames.sort();
        for(let room of this.props.rooms){
            let sortedIndex = sortedByName.indexOf(room.room_name);
            sortedByName[sortedIndex] = room;
        }
        console.log('Alphabetical sort: ', sortedByName);
        return sortedByName;
    }

    reverseAlphabeticalSort(){
        let roomNames = this.props.rooms.map(room => room.room_name).sort();
        let reverseSortedByName = [];
        for(let name of roomNames){
            reverseSortedByName.unshift(name);
        }
        for(let room of this.props.rooms){
            let sortedIndex = reverseSortedByName.indexOf(room.room_name);
            reverseSortedByName[sortedIndex] = room;
        }
        return reverseSortedByName;
    }

    locationSort(){
        let residential = this.props.rooms.filter(room => Number(room.location_type_id) === 1);
        let commercial = this.props.rooms.filter(room => Number(room.location_type_id) === 2);
        if(this.state.sort){
            return [...residential, ...commercial];
        } else {
            return [...commercial, ...residential];
        }
    }

    sortRooms = (sort) => {
        console.log(sort);
        switch(sort){
            case 'id':
                this.state.sort ? this.setState({rooms: [...this.props.rooms.sort(this.idAscendingSort)], sort: !this.state.sort}) : this.setState({rooms: [...this.props.rooms.sort(this.idDescendingSort)], sort: !this.state.sort});
                break;
            case 'room_name':
                this.state.sort ? this.setState({rooms: [...this.alphabeticalSort()], sort: !this.state.sort}) : this.setState({rooms: [...this.reverseAlphabeticalSort()], sort: !this.state.sort});
                break;
            case 'location_type_id':
                this.state.sort ? this.setState({rooms: [...this.locationSort()], sort: !this.state.sort}) : this.setState({rooms: [...this.locationSort()], sort: !this.state.sort});
                break;
            default:
                this.setState({rooms: [...this.props.rooms]});
        }
    }

    handleFilter = (event) => {
        this.setState({filter: event.target.value});
        this.filterRooms(event.target.value);
    }

    render(){
        console.log("Render Table");
        const { classes } = this.props;
        let table = null;
        console.log(this.state.rooms);
        if(this.state.rooms){
            table = (
                <Table className={classes.table}>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell colSpan="10">
                                    <h3 style={{marginRight: 10, display: 'inline', fontWeight: '1'}}>Filter</h3>
                                    <Select
                                        value={this.state.filter}
                                        onChange={this.handleFilter}
                                        style={{fontWeight: '1'}}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={'Residential'}>See Only Residential Rooms</MenuItem>
                                        <MenuItem value={'Commercial'}>See Only Commerical Rooms</MenuItem>
                                    </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Button onClick={() => this.sortRooms('id')}>Room ID</Button></TableCell>
                            <TableCell><Button onClick={() => this.sortRooms('room_name')}>Room Name</Button></TableCell>
                            <TableCell>Cleanliness Score 1</TableCell>
                            <TableCell>Cleanliness Score 2</TableCell>
                            <TableCell>Cleanliness Score 3</TableCell>
                            <TableCell>Cleanliness Score 4</TableCell>
                            <TableCell>Cleanliness Score 5</TableCell>
                            <TableCell><Button onClick={() => this.sortRooms('location_type_id')}>Location Type</Button></TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rooms.map(room => {
                            return(
                                <EditableTableRow rowData={room} remove={this.removeRoom} actions={ROOM_ACTIONS}/>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }
        return(
            <div className={classes.estimatorControlComponent}>
                <Typography variant="title">Add Rooms</Typography>
                <AddRoomForm handleChangeFor={this.handleChangeFor} submitRoom={this.submitRoom} room={this.state.roomInfo.room_name} metric={this.state.roomInfo.cleanliness_metrics} anchor={this.state.anchor} locations={this.props.locations}/>
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
    withStyles(EstimatorControlStyles)
)(RoomControlTable);