import React from 'react';

// Component Imports
import LocationSelectionMenu from './LocationSelectionMenu';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddRoomForm extends React.Component{

    render(){
        console.log('Render FORM');
        let form = null;
        
            form = (
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
                    id="cleanliness_metric_one"
                    label="Dirtiest Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.one}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_two"
                    label="Dirty Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.two}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_three"
                    label="Normal Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.three}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_four"
                    label="Clean Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.four}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_five"
                    label="Cleanest Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.five}
                    onChange={this.props.handleChangeFor}
                />
                <LocationSelectionMenu locations={this.props.locations} handleChangeFor={this.props.handleChangeFor} anchor={this.props.anchor} />
                <Button onClick={this.props.submitRoom}>Add Room</Button>
            </div>);
        
        return(
            <div>
                {form}
            </div>
        );
    }
}

export default AddRoomForm;