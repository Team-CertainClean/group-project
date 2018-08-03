import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ROOM_ACTIONS } from '../../../redux/actions/roomActions';
import { LOCATION_ACTIONS } from '../../../redux/actions/locationActions';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
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

// Component Imports 
import AddRoomForm from './AddRoomForm';
import EditableTableRow from '../../EditableTableRow/EditableTableRow';

const mapStateToProps = store => ({
    locations: store.locations,
    rooms: store.rooms
});

class RoomControlTable extends React.Component{
    constructor(){
        super();
        this.state = {
            roomInfo: {
                room_name: '',
                location_type_id: 0,
                duration_metric: null
            },
            anchor: null
        }
    }

    componentDidMount(){
        this.props.dispatch({type: LOCATION_ACTIONS.FETCH});
        this.props.dispatch({type: ROOM_ACTIONS.FETCH});
    }

    submitRoom = () => {
        this.props.dispatch({type: ROOM_ACTIONS.POST, payload: this.state.roomInfo});
        this.clearInputs();
    }

    removeRoom = (id) => {
        this.props.dispatch({type: ROOM_ACTIONS.REMOVE, payload: id});
    }

    clearInputs = () => {
        this.setState({roomInfo: {room_name: '', location_type_id: 0, duration_metric: 0}});
    }

    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{
                this.setState({roomInfo: {...this.state.roomInfo, [event.target.id]: event.target.value}, anchor: null});
                resolve();
            }catch(error){
                reject();
            }
        });
    }

    render(){
        const { classes } = this.props;
        let table = null;
        if(this.props.rooms){
            table = (
                <Table className={classes.table}>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell>Room ID</TableCell>
                            <TableCell>Room Name</TableCell>
                            <TableCell>Duration Metric</TableCell>
                            <TableCell>Location Type</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.rooms.map(room => {
                            return(
                                <EditableTableRow rowData={room} remove={this.removeRoom} actions={ROOM_ACTIONS} />
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }
        return(
            <Paper className={classes.estimatorControlComponent}>
                <Typography variant="title">Add Rooms</Typography>
                <AddRoomForm handleChangeFor={this.handleChangeFor} submitRoom={this.submitRoom} room={this.state.roomInfo.room_name} metric={this.state.roomInfo.duration_metric} anchor={this.state.anchor} locations={this.props.locations}/>
                <Card className={classes.tableCard}>
                    <CardContent>
                        {table}
                    </CardContent>
                </Card>
            </Paper>
        );
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(EstimatorControlStyles)
)(RoomControlTable);