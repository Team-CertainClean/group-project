import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = state => ({
  request: state.request,
});
class RequestViewTableRow extends Component {

  render() {
    let content = null;

      content = (
        <div>
          {/* <pre>{JSON.stringify(this.props.rowData.request_info)}</pre> */}
          <TableCell>{ this.props.rowData.request_info.request_id }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.first_name }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.email }</TableCell>
          <TableCell>{ this.props.rowData.request_info.est_duration}</TableCell>
          <TableCell>{ this.props.rowData.request_info.cleaning_type_id }</TableCell>
          <TableCell>Button</TableCell>
          <TableCell>{ this.props.rowData.request_info.start_time }</TableCell>
          <TableCell>{ this.props.rowData.request_info.end_timme }</TableCell>
          <TableCell>{ this.props.rowData.contact_info.status }</TableCell>
        </div>
      );
    

    return (
      <TableRow>
        { content }
      </TableRow>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(RequestViewTableRow);