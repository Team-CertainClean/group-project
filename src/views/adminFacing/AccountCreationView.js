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
          cleaner: '',
          first_name: '',
          last_name: '',
          photo_url: '',
        };
      }


    registerAdmin = (event) => {
        event.preventDefault();
    
        if (this.state.password === this.state.confirmPassword) {
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

      toggleAdmin = () => {
          this.setState({
              cleaner: 'false',
          })
      }
      toggleCleaner = () => {
        this.setState({
            cleaner: 'true',
        })
    }

    render(){
        let content = null;
        let buttons = null;
        const { classes } = this.props;
    
        if (this.props.user.userName) {
            buttons = (
                <div>
             <Button onClick={ this.toggleAdmin } className={classes.button}>Admin</Button>
             <Button onClick={ this.toggleCleaner } className={classes.button}>Cleaner</Button>
             </div>
            );
            if (this.state.cleaner === 'true') {

                content = (
                    <div>
                        <form>
                            <Typography>Register New Cleaner</Typography>
                            <div>
                            <TextField
                                id="first_name"
                                placeholder="Cleaner's First Name"
                                value={this.state.first_name}
                                className={classes.textField}
                                onChange={this.handleChange('first_name')}
                                margin="normal"
                            />
                            <TextField
                                id="last_name"
                                placeholder="Cleaner's Last Name"
                                value={this.state.last_name}
                                className={classes.textField}
                                onChange={this.handleChange('last_name')}
                                margin="normal"
                            />
                            <TextField
                                id="photo_url"
                                placeholder="Image URL"
                                value={this.state.photo_url}
                                className={classes.textField}
                                onChange={this.handleChange('photo_url')}
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
                )
            } else {
                content = (
                    <div>
                    {this.renderAlert()}
                    <form >
                    <Typography>Register New Admin</Typography>
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
    }
    
        return(
            <Paper>
                { buttons }
                { content }
            </Paper>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(AccountCreationView);