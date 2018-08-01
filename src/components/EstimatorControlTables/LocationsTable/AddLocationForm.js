import React from 'react';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddLocationForm extends React.Component{
    render(){
        return(
            <div>
                <TextField
                    id="location_type"
                    label="Location Type"
                    type="text"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.location}
                    onChange={this.props.handleChangeFor}
                />
                <Button onClick={this.props.submitLocation}>Add Location</Button>
            </div>
        );
    }
}

export default AddLocationForm;