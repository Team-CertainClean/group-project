import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TableRow, Button, TableCell } from '@material-ui/core';
import RoomInfoModal from '../../RoomInfoModal/RoomInfoModal';

import { REQUEST_ACTIONS } from '../../../redux/actions/requestActions';


const mapStateToProps = state => ({
  request: state.request,
});
class CommercialTableRow extends Component {

  closeRequest = (id) => {
    this.props.dispatch({type: REQUEST_ACTIONS.CLOSE, payload: id})
  }
  updateRequest = (id) => {
    this.props.dispatch({type: REQUEST_ACTIONS.UPDATE, payload: id})
  }

  render() {
    let status = null;
    let scheduled = null;

    if(this.props.rowData.request_info.status === 0){
      status = (<Button onClick={this.updateRequest}>Mark Scheduled</Button>)
      scheduled = ('Unscheduled')
    } else if (this.props.rowData.request_info.status === 1) {
      status = (<Button onClick={this.closeRequest}>Close Event</Button>)
      scheduled = ('Scheduled')
    }

    return (
      <TableRow>
          {/* <pre>{JSON.stringify(this.props.rowData.room_info)}</pre> */}
          <TableCell>{ this.props.rowData.request_info.request_id }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.first_name } { this.props.rowData.contact_info.last_name }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.email }</TableCell>
          <TableCell>{ this.props.rowData.request_info.location_type }</TableCell>
          <TableCell><RoomInfoModal roomInfo={this.props.rowData.room_info.rooms} /></TableCell>
          <TableCell>{ this.props.rowData.request_info.start_time } { this.props.rowData.request_info.end_time }</TableCell>
          <TableCell>{ scheduled }</TableCell>
          <TableCell>{ status }</TableCell>
      </TableRow>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CommercialTableRow);