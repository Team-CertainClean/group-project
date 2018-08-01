import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Component Imports 
import AddRoomForm from './AddRoomForm';

const mapStateToProps = store => ({
    locations: store.locations
});

class RoomControlTable extends React.Component{
    constructor(){
        super();
        this.state = {
            roomInfo: {
                room_name: '',
                location_id: null,
                metric: ''
            },
            anchor: null
        }
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_LOCATIONS'});
    }

    submitRoom = () => {
        // this.props.dispatch({type: 'POST_ROOM', payload: this.state.roomInfo});
        console.log('SEND IT: ', this.state.roomInfo);
    }

    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{
                this.setState({roomInfo: {...this.state.roomInfo, [event.target.id]: event.target.value}, anchor: null});
                resolve();
            }catch(error){
                reject();
            }
        });
    }

    render(){
        return(
            <Paper>
                <Typography variant="title">Add Rooms</Typography>
                <AddRoomForm handleChangeFor={this.handleChangeFor} submitRoom={this.submitRoom} room={this.state.roomInfo.room_name} metric={this.state.roomInfo.metric} anchor={this.state.anchor} locations={this.props.locations}/>
            </Paper>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(RoomControlTable);