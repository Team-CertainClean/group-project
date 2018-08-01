import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

// Component Imports 
import AddLocationForm from './AddLocationForm';

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
        this.props.dispatch({type: 'FETCH_LOCATIONS'});
    }

    submitLocation = () => {
        // this.props.dispatch({type: 'POST_LOCATION', payload: this.state.locationInfo});
        console.log('SEND IT: ', this.state.locationInfo);
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
        let table = null;
        if(this.props.locations){
            table = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Location Type</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Hide</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.locations.map(location => {
                            return(
                                <TableRow key={location.id}>
                                    <TableCell>{location.location_type}</TableCell>
                                    <TableCell><Button>Edit</Button></TableCell>
                                    <TableCell>Insert check box</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }
        return(
            <Paper>
                <Typography variant="title">Add Rooms</Typography>
                <AddLocationForm handleChangeFor={this.handleChangeFor} submitLocation={this.submitLocation} location={this.state.locationInfo.location_type}/>
                {table}
            </Paper>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(LocationControlTable);