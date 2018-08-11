import React, { Component } from 'react';
// import { connect } from 'react-redux';

import { TableRow,TableCell, Icon, IconButton } from '@material-ui/core';


class CommercialTableRow extends Component {

  render() {

    return (
      <TableRow>
          <TableCell>{ this.props.rowData.id }</TableCell>
          <TableCell>{ this.props.rowData.cleaning_type }</TableCell>

      </TableRow>
    );
  }
}

// this allows us to use <App /> in index.js
export default CommercialTableRow;