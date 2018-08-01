import React from 'react';

// Component Imports
import LocationSelectionMenu from './LocationSelectionMenu';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddRoomForm extends React.Component{
    render(){
        return(
            <div>
                <TextField
                    id="room_name"
                    label="Room Name"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.room}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="metric"
                    label="Duration Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metric}
                    onChange={this.props.handleChangeFor}
                />
                <LocationSelectionMenu locations={this.props.locations} handleChangeFor={this.props.handleChangeFor} anchor={this.props.anchor} />
                <Button onClick={this.props.submitRoom}>Add Room</Button>
            </div>
        );
    }
}

export default AddRoomForm;