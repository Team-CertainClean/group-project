import React from 'react';
import axios from 'axios';


// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
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
          confirmPassword: '',
          message: '',
        };
      }


    //   const validate = values => {
    //     const errors = {};
    //     if (!values.username) {
    //       errors.username = 'Required';
    //     }
    //     if (!values.password) {
    //       errors.password = 'Required';
    //     }
    //     if (!values.confirmpassword ) {
    //       errors.confirmpassword = 'Required' ;
    //     } else if (values.confirmpassword !== values.password) {
    //       errors.confirmpassword = 'Password mismatched' ;
    //     }
      
    //      return errors;
    //   };

    validate

    registerAdmin = (event) => {
        event.preventDefault();
    
        if (this.state.password === this.state.confirmPassword && this.state.username !== '') {
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
                this.setState({
                    message: 'That worked. If the passwords are not equal there is a problem'
                })
              } else {
                this.setState({
                  message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
                });
              }
            })
            .catch(() => {
              this.setState({
                message: 'Ooops! Something went wrong!',
              });
            });
        }
      } // end registerAdmin

    handleChange = propertyName => (event) => {
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
            <form >
              <h1>Register New Admin</h1>
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
                    placeholder="Password"
                    value={this.state.password}
                    className={classes.textField}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <TextField
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={this.state.confirmPassword}
                    className={classes.textField}
                    onChange={this.handleChange('confirmPassword')}
                    margin="normal"
                />
              </div>
              <div>
                <Button variant="contained" onClick={this.registerAdmin} className={classes.button}>
                    Submit
                </Button>
                <Link to="/home"><Typography>Cancel</Typography></Link>
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