import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  request: state.request,
});
class RoomList extends Component {

  render() {
    return (
      <center >
      <ul>
        <li> <div style={{ fontSize: '2vw', marginLeft: '5vw', float: 'left', marginRight:'1vw'}}>{this.props.roomInfo.room_name}</div> 
        <div style={{fontSize: '2vw','color':'orange', float: 'left',}}>{this.props.roomInfo.cleanliness_score}</div></li>
      </ul>
      </center>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(RoomList);