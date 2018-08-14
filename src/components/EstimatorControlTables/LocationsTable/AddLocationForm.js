import React from 'react';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { EstimatorControlStyles } from '../styles';
import Button from '@material-ui/core/Button';

class AddLocationForm extends React.Component{
    render(){
        const { classes } = this.props;
        return(
            <div>
            <div className={classes.formblock}>
                <TextField
                    id="location_type"
                    label="Location Type"
                    type="text"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.location}
                    onChange={this.props.handleChangeFor}
                />
            </div>
                <center>
                <Button className={classes.submitButton} onClick={this.props.submitLocation}>Add Location</Button>
                </center>
            </div>
        );
    }
}

export default withStyles(EstimatorControlStyles)(AddLocationForm);