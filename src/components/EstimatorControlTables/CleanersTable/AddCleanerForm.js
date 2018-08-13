import React from 'react';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { EstimatorControlStyles } from '../styles';
import Button from '@material-ui/core/Button';

class AddCleanerForm extends React.Component{
    render(){
        const { classes } = this.props;
        return(
            <div>
                <div className={classes.formblock}>
                <TextField
                    id="first_name"
                    label="First Name"
                    type="text"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.first_name}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="last_name"
                    label="Last Name"
                    type="text"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.last_name}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="properly_account_id"
                    label="Properly Account ID"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.properly_account_id}
                    onChange={this.props.handleChangeFor}
                />
                </div>
                <center>
                <Button className={classes.submitButton} onClick={this.props.submitCleaner}>Add Cleaner</Button>
                </center>
            </div>
        );
    }
}

export default withStyles(EstimatorControlStyles)(AddCleanerForm);