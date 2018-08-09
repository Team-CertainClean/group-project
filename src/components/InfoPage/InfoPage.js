import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import { Typography } from '@material-ui/core';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <Typography variant="title">
            Technologies Used:
          </Typography>
          <ul>
            <Typography variant="body1">ReactJS</Typography>
            <Typography variant="body1">Redux</Typography>
            <Typography variant="body1">NodeJS</Typography>
            <Typography variant="body1">Big Calendar</Typography>
            <Typography variant="body1">MomentJS</Typography>
            <Typography variant="body1">Passport</Typography>
            <Typography variant="body1">Material UI</Typography>
          </ul>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
