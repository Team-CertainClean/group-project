import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RoomComponent from '../RoomComponent/RoomComponent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
  card: {
    width: '250px',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
};

const mapStateToProps = state => ({
    user: state.user,
    rooms: state.rooms.roomSelections,
});

class RoomInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingRoom: false,
            addedRoom: {
                type: '',
                dirtiness: 0,
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    addRoom = (event) => {
        this.setState({addingRoom: !this.state.addingRoom});
        this.renderAddRoom();
    }

    handleChange = (event) => {
        this.setState({...this.state.addedRoom, type: event.target.value})
        console.log('addedRoom type:', this.state.addedRoom);
    };

    hideAddRoom = (event) => {
        this.setState({addingRoom: false});
        this.renderAddRoom();
    }

    // renderAddRoom() {
    //     if (this.state.addingRoom === true) {
    //         return (
    //             <div className="addRoom">
    //                 {/* something similar to the room component with a drop down menu goes here */}
    //                 <FormControl>
    //                     <InputLabel>Room Type</InputLabel>
    //                     <Select
    //                         value={this.state.addedRoom.type}
    //                         onChange={this.handleChange}
    //                         inputProps={{
    //                         name: 'roomType',
    //                         id: 'roomType',
    //                         }}
    //                     >
    //                         <MenuItem value={'living'}>Living Room</MenuItem>
    //                         <MenuItem value={'bathroom'}>Bathroom</MenuItem>
    //                         <MenuItem value={'bedroom'}>Bedroom</MenuItem>
    //                         <MenuItem value={'kitchen'}>Kitchen</MenuItem>
    //                     </Select>
    //                 </FormControl>
    //             </div>
    //         );
    //     }
    // }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary">
                            ROOMS:
                        </Typography>
                        {this.props.rooms.map((room, i) => 
                            <div className={classes.roomBars} key={i}> 
                                <RoomComponent room={room}/>
                            </div>
                        )}
                    </CardContent>
                    <CardActions>
                        <div>
                            <ClickAwayListener onClickAway={this.hideAddRoom}>
                                <div>
                                    {this.renderAddRoom()}
                                    <Button variant="contained" size="small" onClick={this.addRoom}>
                                        + ADD ROOM
                                    </Button>
                                    
                                </div>
                            </ClickAwayListener>
                        </div>    
                    </CardActions>
                </Card>
            </div>
        );
    }
}

RoomInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(RoomInfo);