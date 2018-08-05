import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '../../../node_modules/@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { compose } from 'redux';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 230,
      },
      button: {
          backgroundColor: '#EF8902',
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },

});

const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class AdminLoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch(clearError());
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName !== null) {
      this.props.history.push('requests');
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleChange = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    let content = null;
    const { classes } = this.props;
    content = (
        <div>
        {this.renderAlert()}
        <form >
        <Typography>Admin Login</Typography>
        <div>
            <TextField
                id="username"
                placeholder="Username"
                value={this.state.username}
                className={classes.textField}
                onChange={this.handleChange('username')}
                margin="normal"
            />
            <TextField
                id="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                className={classes.textField}
                onChange={this.handleChange('password')}
                margin="normal"
            />
        </div>
        <div>
            <Button variant="contained" onClick={this.login} className={classes.button}>
                Submit
            </Button>
            {/* <Link to="/home"><Typography>Cancel</Typography></Link> */}
        </div>
        </form>
    </div>
    );
    return (
      <div>
        { content }
      </div>
    );
  }
}

// export default connect(mapStateToProps)(AdminLoginPage);
export default compose(withStyles(styles), connect(mapStateToProps))(AdminLoginPage);