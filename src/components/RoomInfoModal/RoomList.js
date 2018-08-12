import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  request: state.request,
});
class RoomList extends Component {

  render() {
    return (
      <ul>
        <li>{this.props.roomInfo.room_name} | {this.props.roomInfo.cleanliness_score}</li>
      </ul>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(RoomList);