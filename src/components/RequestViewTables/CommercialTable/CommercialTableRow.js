import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import RoomInfoModal from '../../RoomInfoModal/RoomInfoModal';


const mapStateToProps = state => ({
  request: state.request,
});
class CommercialTableRow extends Component {

  render() {
    return (
      <TableRow>
          {/* <pre>{JSON.stringify(this.props.rowData.room_info)}</pre> */}
          <TableCell>{ this.props.rowData.request_info.request_id }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.first_name } { this.props.rowData.contact_info.last_name }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.email }</TableCell>
          <TableCell>{ this.props.rowData.request_info.location_type }</TableCell>
          <TableCell><RoomInfoModal roomInfo={this.props.rowData.room_info.rooms} /></TableCell>
          <TableCell>{ this.props.rowData.request_info.start_time } { this.props.rowData.request_info.end_time }</TableCell>
          <TableCell>{ this.props.rowData.request_info.status }</TableCell>
      </TableRow>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CommercialTableRow);