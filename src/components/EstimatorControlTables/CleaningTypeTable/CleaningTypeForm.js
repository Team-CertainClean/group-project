import React from 'react';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CleaningTypeForm extends React.Component{
    render(){
        return(
            <div>
                <TextField
                    id="cleaning_type"
                    label="Cleaning Type"
                    type="text"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.cleaningType}
                    onChange={this.props.handleChangeFor}
                />
                <Button onClick={this.props.submitCleaningType}>Add Type</Button>
            </div>
        );
    }
}

export default CleaningTypeForm;