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
                duration_metric: ''
            },

            anchor: null
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
        this.setState({roomInfo: {room_name: '', location_type_id: 0, duration_metric: ''}});
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

<<<<<<< HEAD
    handleChangePage = (event, page) => {
        this.setState({ page });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    }

    handleRowEdit = () => {

    }

=======
>>>>>>> 0648e963fafdf6086cfde3704ce1ee3772f55f84
    render(){
        const { page, rowsPerPage } = this.state;
        const { classes } = this.props;
        let table = null;
        console.log(this.state.rooms);
        if(this.state.rooms){
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
<<<<<<< HEAD
                        {this.state.rooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(room=> {
=======
                        {this.props.rooms.map(room => {
>>>>>>> 0648e963fafdf6086cfde3704ce1ee3772f55f84
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
                <AddRoomForm handleChangeFor={this.handleChangeFor} submitRoom={this.submitRoom} room={this.state.roomInfo.room_name} metric={this.state.roomInfo.duration_metric} anchor={this.state.anchor} locations={this.props.locations}/>
                <Card className={classes.tableCard}>
                    <CardContent>
                        {table}
<<<<<<< HEAD
                        <TablePagination
                            component="div"
                            count={this.state.rooms.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
=======
>>>>>>> 0648e963fafdf6086cfde3704ce1ee3772f55f84
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