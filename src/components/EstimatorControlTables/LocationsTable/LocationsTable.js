import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LOCATION_ACTIONS } from '../../../redux/actions/locationActions';

// Material UI Imports
import{ Typography,
        Table,
        TableHead,
        TableBody,
        TableRow,
        TableCell,
        Card,
        CardContent } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {EstimatorControlStyles} from '../styles';

// Component Imports 
import AddLocationForm from './AddLocationForm';
import EditableTableRow from '../../EditableTableRow/EditableTableRow';

const mapStateToProps = store => ({
    locations: store.locations,
});

class LocationControlTable extends React.Component{
    constructor(){
        super();
        this.state = {
            locationInfo: {
                location_type: ''
            }
        }
    }

    componentDidMount(){
        this.props.dispatch({type: LOCATION_ACTIONS.FETCH});
    }

    submitLocation = () => {
        this.props.dispatch({type: LOCATION_ACTIONS.POST, payload: this.state.locationInfo});
        this.clearInputs();
    }

    removeLocation = (id) => {
        this.props.dispatch({type: LOCATION_ACTIONS.REMOVE, payload: id});
    }

    clearInputs = () => {
        this.setState({locationInto: {location_type: ''}});
    }

    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{
                this.setState({locationInfo: {...this.state.locationInfo, [event.target.id]: event.target.value}});
                resolve();
            }catch(error){
                reject();
            }
        });
    }

    render(){
        const {classes} = this.props;
        let table = null;
        if(this.props.locations){
            table = (
                <Table className={classes.table}>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell>Location ID</TableCell>
                            <TableCell>Location Type</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Hide</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.locations.map(location => {
                            return(
                                <EditableTableRow rowData={location} actions={LOCATION_ACTIONS} remove={this.removeLocation}/>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }
        return(
            <div className={classes.estimatorControlComponent}>
                <Typography variant="title">Add Locations</Typography>
                <AddLocationForm handleChangeFor={this.handleChangeFor} submitLocation={this.submitLocation} location={this.state.locationInfo.location_type}/>
                <Card className={classes.tableCard}>
                    <CardContent>
                        {table}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(EstimatorControlStyles)
)(LocationControlTable);