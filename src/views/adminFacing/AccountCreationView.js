import React from 'react';
import axios from 'axios';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
// import styles from '../../styles/LandingViewStyles';
import { Typography } from '../../../node_modules/@material-ui/core';
import TextField from '@material-ui/core/TextField';

// Component Imports
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
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

});

class AccountCreationView extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          message: '',
        };
      }

    registerAdmin = (event) => {
        event.preventDefault();
    
        if (this.state.username === '' || this.state.password === '') {
          this.setState({
            message: 'Choose a username and password!',
          });
        } else {
          const body = {
            username: this.state.username,
            password: this.state.password,
          };
    
          // making the request to the server to post the new admin's registration
          axios.post('/api/admin/register/', body)
            .then((response) => {
              if (response.status === 201) {
                this.props.history.push('/home');
              } else {
                this.setState({
                  message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
                });
              }
            })
            .catch(() => {
              this.setState({
                message: 'Ooops! Something went wrong! Is the server running?',
              });
            });
        }
      } // end registerAdmin

    handleInputChangeFor = propertyName => (event) => {
    this.setState({
        [propertyName]: event.target.value,
    });
    }

    renderAlert() {
        if (this.state.message !== '') {
          return (
            <h2
              className="alert"
              role="alert"
            >
              {this.state.message}
            </h2>
          );
        }
        return (<span />);
      }

    render(){
        let content = null;
        const { classes } = this.props;
    
        if (this.props.user.userName) {
          content = (

            <div>
            {this.renderAlert()}
            <form onSubmit={this.registerUser}>
              <h1>Register User</h1>
              <div>
                <label htmlFor="username">
                  Username:
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleInputChangeFor('username')}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="password">
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChangeFor('password')}
                  />
                </label>
              </div>
              <div>
                <input
                  type="submit"
                  name="submit"
                  value="Register"
                />
                <Link to="/home">Cancel</Link>
              </div>
            </form>
          </div>
          );
        }
    
        return(
            <Paper>
                { content }
            </Paper>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(AccountCreationView);