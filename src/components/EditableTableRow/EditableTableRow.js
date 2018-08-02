import React from 'react';
import { connect } from 'react-redux';

// Material UI Imports
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import LocationSelectionMenu from '../EstimatorControlTables/RoomsTable/LocationSelectionMenu';

const mapStateToProps = store => ({
    locations: store.locations
});

class EditableTableRow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
                        editing: false, 
                        content: {
                            ...this.props.rowData
                        }
                    }
    }

    openEdit = () => {
        this.setState({editing: true});
    }

    closeEdit = () => {
        this.setState({editing: false});
    }

    submitEdit = () => {
        this.props.dispatch({type: this.props.actions.EDIT, payload: this.state.content});
        this.closeEdit();
    }

    handleChangeFor = (event) => {
        return new Promise((resolve) => {
            this.setState({content: {...this.state.content, [event.target.id]: event.target.value}});
            resolve();
        });
    }

    render(){
        let row = [];
        if(this.props.rowData){
            for(let cell in this.props.rowData){
                row.push(cell);
            }
        }
        row.forEach((cell, index)=> cell === 'location_type_id' ? row.splice(index, 1) : null);
        console.log("Row cells: ", row);
        console.log(this.state.content);
        let content = null;
        if(this.state.editing){
            content = (
                <TableRow>
                    {row.map((cell, i)=> {
                        return (
                            <TableCell key={i}>
                            {
                                cell == 'location_type' ?
                                <LocationSelectionMenu locations={this.props.locations} handleChangeFor={this.handleChangeFor}/>
                                : 
                                cell != 'id' ? 
                                <TextField 
                                    // label={cell}
                                    id={cell} 
                                    value={this.state.content[cell]}
                                    onChange={this.handleChangeFor}
                                /> 
                                :
                                this.state.content[cell]
                            }
                            </TableCell>
                        )
                    })}
                    <TableCell>
                        <IconButton onClick={this.closeEdit}>
                            <Icon>cancel</Icon>
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={this.submitEdit}>
                            <Icon>done</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        } else {
            content = (
                <TableRow>
                    {row.map((cell, i) => {
                        return (
                            <TableCell key={i}>
                                {this.props.rowData[cell]}
                            </TableCell>
                        )
                    })}
                    <TableCell>
                        <IconButton onClick={this.openEdit}>
                            <Icon>edit</Icon>
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={() => {this.props.remove(this.state.content['id'])}}>
                            <Icon>delete_outline</Icon>
                        </IconButton>
                    </TableCell>
                </TableRow>
            );
        }
        return content;
    }
}

export default connect(mapStateToProps)(EditableTableRow);