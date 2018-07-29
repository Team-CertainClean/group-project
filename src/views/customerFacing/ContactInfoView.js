import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  user: state.user,
});

class ContactInfoView extends Component {
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
            <form noValidate autoComplete="off">
            <TextField
                        id="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                    <TextField
                        id="address"
                        placeholder="Address"
                        value={this.state.address}
                        onChange={this.handleChange('address')}
                        margin="normal"
                    />
                    <TextField
                        id="cityStateZip"
                        placeholder="City, State, Zip"
                        value={this.state.cityStateZip}
                        onChange={this.handleChange('cityStateZip')}
                        margin="normal"
                    />
                    <TextField
                        id="phone"
                        placeholder="Phone"
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                        margin="normal"
                    />
            </form>
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
export default connect(mapStateToProps)(ContactInfoView);