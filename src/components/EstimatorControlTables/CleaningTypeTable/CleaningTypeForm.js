import React from 'react';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { EstimatorControlStyles } from '../styles';
import Button from '@material-ui/core/Button';

class CleaningTypeForm extends React.Component{
    render(){
        const { classes } = this.props;
        return(
            <div>
                <div className={classes.formblock}>
                <TextField
                    id="cleaning_type"
                    label="Cleaning Type"
                    type="text"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.cleaning_type}
                    onChange={this.props.handleChangeFor}
                />
                </div>
                <center>
                <Button className={classes.submitButton} onClick={this.props.submitCleaningType}>Add Type</Button>
                </center>
            </div>
        );
    }
}

export default withStyles(EstimatorControlStyles)(CleaningTypeForm);