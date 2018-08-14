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
      this.props.history.push('login');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="navbar">
        <div>
          <ul>
            <li>
              <Link to="/requests" style={{textDecorationLine: 'none'}}>
                <Button>
                  Requests
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/estimator" style={{textDecorationLine: 'none'}}>
                <Button>
                  Estimator Controller
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/calendar" style={{textDecorationLine: 'none'}}>
                <Button>
                  Availability Calendar
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/accountCreation" style={{textDecorationLine: 'none'}}>
                <Button>
                  Create New Admin
                </Button>
              </Link>
            </li>
            <li>
              <Link to="/home" style={{textDecorationLine: 'none'}}>
                <Button>
                  View Customer Facing Estimator
                </Button>
                </Link>
            </li>
            <li style={{position: 'fixed', right: '10px', top: '13px'}}>
              <Button  style={{backgroundColor: 'black',color: 'white', padding: 'vw', borderRadius: '5vw'}} onClick={this.logout}>
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
