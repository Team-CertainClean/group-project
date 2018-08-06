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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
            filter: ''
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
                            <TableCell>Room ID</TableCell>
                            <TableCell>Room Name</TableCell>
                            <TableCell>Cleanliness Score 1</TableCell>
                            <TableCell>Cleanliness Score 2</TableCell>
                            <TableCell>Cleanliness Score 3</TableCell>
                            <TableCell>Cleanliness Score 4</TableCell>
                            <TableCell>Cleanliness Score 5</TableCell>
                            <TableCell>Location Type</TableCell>
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