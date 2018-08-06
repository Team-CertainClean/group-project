import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import RoomInfoModal from '../../components/RoomInfoModal/RoomInfoModal';


const mapStateToProps = state => ({
  request: state.request,
});
class RoomList extends Component {

  render() {
    return (
      <ul>
        <li>{this.props.roomInfo.room_name}  {this.props.roomInfo.cleanliness_score}</li>
      </ul>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(RoomList);