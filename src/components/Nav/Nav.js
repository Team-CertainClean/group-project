import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';


const mapStateToProps = state => ({
  user: state.user,
});
class Nav extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      // this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="navbar">
        <div>
          <ul>
          <li>
            <Link to="/landing">
                Landing
              </Link>
            </li>
            <li>
              <Link to="/user">
                User Home
              </Link>
            </li>
            <li>
              <Link to="/info">
                Info Page
              </Link>
            </li>
            <li>
              <Link to="/estimator">
                Estimator Controller
              </Link>
            </li>
            <li>
              <Link to="/accountCreation">
                Create New Admin
              </Link>
            </li>
            <li>
              <Link to="/requests">
                Requests
              </Link>
            </li>
            <li>
              <Button onClick={this.logout}>
                Log Out
              </Button>
            </li>
          </ul>
        </div>
      </div>
      );
    }

    return (
      <div>
        { content }
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Nav);
