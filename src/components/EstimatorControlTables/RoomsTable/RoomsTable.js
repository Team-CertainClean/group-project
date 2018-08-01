import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// Component Imports
import LocationSelectionMenu from './LocationSelectionMenu';

class RoomControlTable extends React.Component{
    constructor(){
        super();
        this.state = {
            roomInfo: {
                room_name: null,
                location_id: null,
                metric: null
            }
        }
    }


    handleInputChange = (prop) => event => {
        this.setState({roomInfo: {...this.state.roomInfo, [prop]: event.target.value}});
    }

    render(){
        return(
            <Paper>
                <Typography variant="title">Add Rooms</Typography>
                <TextField
                    id="roomName"
                    label="Room Name"
                    // className={classes.textField}
                    margin="normal"
                    onChange={() => this.handleInputChange('room_name')}
                />
                <TextField
                    id="durationMetric"
                    label="Duration Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    onChange={() => this.handleInputChange('metric')}
                />
                <LocationSelectionMenu handleInputChange={this.handleInputChange}/>
            </Paper>
        );
    }
}

export default compose(
    connect()
)(RoomControlTable);