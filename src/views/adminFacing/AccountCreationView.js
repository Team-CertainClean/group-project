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
import Nav from '../../components/Nav/Nav';
import SweetAlertSuccess from '../../redux/modules/sweetAlertSuccess';
import SweetAlertFailure from '../../redux/modules/sweetAlertFailure';


const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
      },
      textField: {
        fontSize: '2vw',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 230,
      },
      formControl: {
      
        minWidth: 120,
      },
      loginbox: {
        
      },
      paper: {
        overflow:'auto',
        padding: '2vw',
        paddingLeft: '3vw',
        paddingRight: '3vw',
        borderRadius: '100vw',
        backgroundColor: 'white',
        width:'30vw',
        
        marginTop: '15vw',
        boxShadow: "2px 2px 5px grey",
        verticalAlign: 'middle',
      },
      bg:{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, white 0%,  lightgrey 100%)',
        backgroundColor: 'lightgrey',
      },
      submitButton: {
        float: 'left',
        backgroundSize: '200% auto',
        transition: '0.5s',
        backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #fe981e 100%)',
        borderRadius: '200px',
        display: 'flex',
        backgroundColor: '#ef8902',
        // marginTop: '3vw',
        margin: '1vw',
        // padding: '2%',
        // paddingLeft: '4%',
        // paddingRight: '4%',
        fontSize: '2vw',
        color: 'white !important',
        '&:hover': {
          backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,#fbad40 100%)',
          backgroundColor: '#E8E8E8',
          backgroundPosition: 'right center'
        }
      },
      cancelButton: {
        margin: '1vw',
        float: 'left',
        // margin: '1vw',
        // padding: '2%',
        // paddingLeft: '4%',
        // paddingRight: '4%',
        borderRadius: '100px',
        fontSize: '2vw',
        color: 'grey',
        border: '0.2vw solid grey',
        '&:hover': {
          border: '0.2vw solid rgba(255,255,255,0.5)'
        }
      },
      buttondiv:{
        marginTop: '0.5vw',
        marginLeft: '4vw'

      }

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

    async passwordError(){
      await this.setState({
        message: 'Passwords do not match!',
      });
      await SweetAlertFailure(this.state.message)
    }

    registerAdmin = (event) => {
        event.preventDefault();
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
          this.passwordError();
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
                    message: 'The admin has been created!',
                    username: '',
                    password: '',
                    confirmPassword: ''
                })
                SweetAlertSuccess(this.state.message);
              } else {
                this.setState({
                  message: 'Ooops! That didn\'t work. Try again!',
                });
                SweetAlertFailure(this.state.message)
              }
            })
            .catch(() => {
              this.setState({
                message: 'Username is taken',
              });
              SweetAlertFailure(this.state.message)
            });
        }
      } // end registerAdmin

    handleChange = propertyName => (event) => {
    this.setState({
        [propertyName]: event.target.value,
    });
    }

    render(){
        let content = null;
        let nav = null;
        const { classes } = this.props;
    
        if (this.props.user.userName) {
                nav = (
                  <Nav history={this.props.history}/>
                )
                content = (
                    <div >
                      <center>
                    <h2>Register New Admin</h2>
                      </center>
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
                        <TextField
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            className={classes.textField}
                            onChange={this.handleChange('confirmPassword')}
                            margin="normal"
                        />
                    </div>
                    
                      <center  className={classes.buttondiv}>
                        <Button variant="contained" onClick={this.registerAdmin} className={classes.submitButton}>
                            Submit
                        </Button>
                        <Link to="/home"><Button className={classes.cancelButton}>Cancel</Button></Link>
                      </center>
                    
                    </div>
                );
        }
    
    
        return(
            <div >
                { nav }
                  <center  className={classes.bg}>
                    <div className={classes.loginbox}>
                          <div className={classes.paper}>
                             { content }
                          </div>
                    </div>
                  </center>
            </div>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(AccountCreationView);