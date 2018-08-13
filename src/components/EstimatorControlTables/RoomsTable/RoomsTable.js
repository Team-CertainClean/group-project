import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ROOM_ACTIONS } from '../../../redux/actions/roomActions';
import { LOCATION_ACTIONS } from '../../../redux/actions/locationActions';

// Material UI Imports
import{ Typography,
        Table,
        TableHead,
        TableBody,
        TableRow,
        TableCell,
        Card,
        CardContent,
        Select,
        MenuItem,
        IconButton,
        Icon        } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { EstimatorControlStyles } from '../styles';

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
                cleanliness_one_metric: '',
                cleanliness_two_metric: '',
                cleanliness_three_metric: '',
                cleanliness_four_metric: '',
                cleanliness_five_metric: '',
            },
            anchor: null,
            rooms: [],
            filter: 'None',
            sort: false
        }
    }
    /* 
        When the component mounts react-redux will dispatch to Sagas to 
        initiate the request for locations and rooms from the database.
    */
    componentDidMount(){
        this.props.dispatch({type: LOCATION_ACTIONS.FETCH});
        this.props.dispatch({type: ROOM_ACTIONS.FETCH});
    }
    /*
        When the component receives updated properties, and if those props
        are rooms from the database, we will set the local state property "rooms"
        to be equal to those retrieved from the database.

        This will provide us with an array of rooms we can manipulate through sorting,
        and filtering.
    */
    componentWillReceiveProps(nextProps){
        if(nextProps.rooms){
            this.setState({rooms: [...nextProps.rooms]});
        }
    }
    /*
        The submitRoom method runs on the click of the "ADD ROOM" button in the AddRoomForm component.

        It will dispatch the form data and initiate the full-stack route for adding a room to the database, 
        stored in local state, and then clear the inputs.
    */
    submitRoom = () => {
        this.props.dispatch({type: ROOM_ACTIONS.POST, payload: this.state.roomInfo});
        this.clearInputs();
    }
    /*
        The removeRoom method runs on the click of any delete icon in the table rows.  The id of the room 
        that is populating the row is passed to the method and attached to the dispatch as the payload.

        This initiates the full-stack route for deleting a room from the database and updating the table.
    */
    removeRoom = (id) => {
        this.props.dispatch({type: ROOM_ACTIONS.REMOVE, payload: id});
    }
    /*
        The clearInputs method runs as part of the submitRoom method, and clears the input fields of the form.
    */
    clearInputs = () => {
        this.setState({roomInfo: {room_name: '', location_type_id: 0, cleanliness_metric_one: '', cleanliness_metric_two: '', cleanliness_metric_three: '', cleaniness_metric_four: '', cleanliness_metric_five: ''}});
    }
    /*
        The handleChangeFor method handles the changes for all of the input fields in the AddRoomForm.

        The id of the input field must be the same as the key within local state being changed.
    */
    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{
                switch(event.target.id){
                    case 'clealiness_one_metric':
                    case 'clealiness_two_metric':
                    case 'clealiness_three_metric':
                    case 'clealiness_four_metric':
                    case 'clealiness_five_metric':
                        this.setState({roomInfo: {...this.state.roomInfo, [event.target.id]: event.target.value, anchor: null}});
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
    /*
        The filterRooms method runs on change of the selection menu.

        The method is passed a filter param, and the switch controls the behaviors.
    */
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
    /*
        The idAscendingSort method is used to sort the table rows by room id in ascending order
    */
    idAscendingSort(a, b){
        return Number(a.id) - Number(b.id);
    }
    /*
        The idDescendingSort method is used to sort the table rows by room id in descending order
    */
    idDescendingSort(a, b){
        return Number(b.id) - Number(a.id);
    }
    /*
        The alphabeticalSort method is used to sort the table rows by room name.

        First, we create an array of only room names, and then sort them alphabetically using .sort()

        Then we iterate through the complete rooms array (this.props.rooms):
            - we acquire a "sortedIndex" by calling .indexOf() on the sortedByName array
            - Then we replace the room name at that index with the corresponding room object
    */
    alphabeticalSort(){
        let roomNames = this.props.rooms.map(room => room.room_name);
        let sortedByName = roomNames.sort();
        for(let room of this.props.rooms){
            let sortedIndex = sortedByName.indexOf(room.room_name);
            sortedByName[sortedIndex] = room;
        }
        return sortedByName;
    }
    /*
        The reverseAlphabeticalSort method is used to sort the table rows in reverse order by room name.

        The logic is very similar to that of alphabeticalSort, however we create the "sorted" array by unshifting
    */
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
    /*
        The locationSort method creates two arrays by filtering this.props.rooms for rooms with
        appropriate location_type_ids.

        Then, depending on the sort boolean in local state, we return a spread with residential first, or commerical first.
    */
    locationSort(){
        let residential = this.props.rooms.filter(room => Number(room.location_type_id) === 1);
        let commercial = this.props.rooms.filter(room => Number(room.location_type_id) === 2);
        if(this.state.sort){
            return [...residential, ...commercial];
        } else {
            return [...commercial, ...residential];
        }
    }
    /*
        The sortRooms method takes a "sort" parameter and runs it through a switch statement.

        Depending on the sort parameter, the sortRooms method will setState to adjust the rooms array in 
        local state to reflect the desired sort.

        This way when the table is rendered, we render the rows in a sorted order.
    */
    sortRooms = (sort) => {
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
    /*
        The handleFilter method runs on change of the filter selection menu.

        This method sets state to store the filter parameter and initiate the render method again.

        Lastly, the method calls the filterRooms method.
    */
    handleFilter = (event) => {
        this.filterRooms(event.target.value);
        this.setState({filter: event.target.value});
    }

    render(){
        const { classes } = this.props;
        let table = null;
        // If this.state.rooms is existent, we render the table using this.state.rooms (sorted, filtered, or untouched)
        if(this.state.rooms){
            table = (
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow style={{backgroundColor: 'white'}}>
                            <TableCell colSpan="10">
                                    <h3 style={{marginRight: 10, display: 'inline', fontWeight: 2, color: 'black'}}>Filter Options</h3>
                                    <Select
                                        value={this.state.filter}
                                        onChange={this.handleFilter}
                                        style={{fontWeight: '1', '& *': {color: 'black'}}}
                                    >
                                        <MenuItem value={'None'}>
                                            None
                                        </MenuItem>
                                        <MenuItem value={'Residential'}>See Only Residential Rooms</MenuItem>
                                        <MenuItem value={'Commercial'}>See Only Commerical Rooms</MenuItem>
                                    </Select>
                            </TableCell>
                        </TableRow>
                        <TableRow  className={classes.tableHeader}>
                            <TableCell>Room ID<IconButton onClick={() => this.sortRooms('id')}><Icon>sort</Icon></IconButton></TableCell>
                            <TableCell>Room Name<IconButton onClick={() => this.sortRooms('room_name')}><Icon>sort</Icon></IconButton></TableCell>
                            <TableCell>Cleanliness Score 1</TableCell>
                            <TableCell>Cleanliness Score 2</TableCell>
                            <TableCell>Cleanliness Score 3</TableCell>
                            <TableCell>Cleanliness Score 4</TableCell>
                            <TableCell>Cleanliness Score 5</TableCell>
                            <TableCell>Location Type<IconButton onClick={() => this.sortRooms('location_type_id')}><Icon>sort</Icon></IconButton></TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rooms.map(room => {
                            return(
                                <EditableTableRow rowData={room} remove={this.removeRoom} actions={ROOM_ACTIONS} handleChangeFor={this.handleChangeFor}/>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }

        const metrics = {one: this.state.cleanliness_one_metric, two: this.state.cleanliness_two_metric, three: this.state.cleanliness_three_metric, four: this.state.cleanliness_four_metric, five: this.state.cleanliness_five_metric}

        return(
            <div className={classes.estimatorControlComponent}>
                <Typography style={{marginBottom: 10}} variant="title">Add Rooms</Typography>
                <AddRoomForm handleChangeFor={this.handleChangeFor} submitRoom={this.submitRoom} room={this.state.roomInfo.room_name} metrics={metrics} anchor={this.state.anchor} locations={this.props.locations}/>
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