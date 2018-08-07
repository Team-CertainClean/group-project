import React, { Component } from 'react';

import { TableRow, TableCell, Button } from '@material-ui/core';

import RoomInfoModal from '../../RoomInfoModal/RoomInfoModal';


class ResidentialTableRow extends Component {

  render() {
    let status = null;
    const { classes } = this.props;
    if(this.props.rowData.request_info.status === 0){
      status = (<Button>Mark Scheduled</Button>)
    } else if (this.props.rowData.request_info.status === 1) {
      status = (<Button>Close Event</Button>)
    }

    return (
      <TableRow>
          {/* <pre>{JSON.stringify(this.props.rowData.room_info.rooms)}</pre> */}
          <TableCell numeric style={{padding:'none'}}>{ this.props.rowData.request_info.request_id }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.first_name  } {this.props.rowData.contact_info.last_name}</TableCell>
          <TableCell>{ this.props.rowData.contact_info.email }</TableCell>
          <TableCell numeric>{ this.props.rowData.request_info.est_duration} hours</TableCell>
          <TableCell numeric style={{padding:'none'}}>{ this.props.rowData.request_info.cleaning_type }</TableCell>
          <TableCell><RoomInfoModal roomInfo={this.props.rowData.room_info.rooms}/></TableCell>
          <TableCell>{ this.props.rowData.request_info.start_time } { this.props.rowData.request_info.end_time }</TableCell>
          <TableCell>{ status }</TableCell>
          <TableCell>EditStatusButton</TableCell>
      </TableRow>
    );
  }
}

// this allows us to use <App /> in index.js
export default ResidentialTableRow;