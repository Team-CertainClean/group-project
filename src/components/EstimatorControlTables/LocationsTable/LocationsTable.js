import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { LOCATION_ACTIONS } from '../../../redux/actions/locationActions';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import {withStyles} from '@material-ui/core/styles';
import {EstimatorControlStyles} from '../styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
            },
            page: 0,
            rowsPerPage: 5
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

    handleChangePage = (event, page) => {
        this.setState({ page });
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    }

    render(){
        const {classes} = this.props;
        const { page, rowsPerPage } = this.state;
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
                        <TablePagination
                            component="div"
                            count={this.props.locations.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
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