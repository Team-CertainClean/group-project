import React from 'react';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddCleanerForm extends React.Component{
    render(){
        return(
            <div>
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
                <Button onClick={this.props.submitCleaner}>Add Cleaner</Button>
            </div>
        );
    }
}

export default AddCleanerForm;