import React, { Component } from 'react';

import { TableRow, TableCell, Button } from '@material-ui/core';

import RoomInfoModal from '../../RoomInfoModal/RoomInfoModal';
import { REQUEST_ACTIONS } from '../../../redux/actions/requestActions';


class ResidentialTableRow extends Component {

  closeEvent = (id) => {
    this.props.dispatch({type: REQUEST_ACTIONS.CLOSE, payload: id})
  }

  render() {
    let status = null;
    let scheduled = null;
    const { classes } = this.props;

    //creates buttons to mark as scheduled and close/delete event
    if(this.props.rowData.request_info.status === 0){
      status = (<Button>Mark Scheduled</Button>)
      scheduled = ('Unscheduled')
    } else if (this.props.rowData.request_info.status === 1) {
      status = (<Button onClick={this.closeEvent}>Close Event</Button>)
      scheduled = ('Scheduled')
    }


    return (
      <TableRow>
          {/* <pre>{JSON.stringify(this.props.rowData.room_info.rooms)}</pre> */}
          <TableCell>{ this.props.rowData.request_info.request_id }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.first_name  } {this.props.rowData.contact_info.last_name}</TableCell>
          <TableCell>{ this.props.rowData.contact_info.email }</TableCell>
          <TableCell>{ this.props.rowData.request_info.est_duration} hours</TableCell>
          <TableCell>{ this.props.rowData.request_info.cleaning_type }</TableCell>
          <TableCell><RoomInfoModal roomInfo={this.props.rowData.room_info.rooms}/></TableCell>
          <TableCell>{ this.props.rowData.request_info.start_time } { this.props.rowData.request_info.end_time }</TableCell>
          <TableCell>{ scheduled }</TableCell>
          <TableCell>{ status }</TableCell>
      </TableRow>
    );
  }
}

// this allows us to use <App /> in index.js
export default ResidentialTableRow;