import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import Nav from '../../components/Nav/Nav';
import Stepper from '../../components/Stepper/Stepper';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CONTACT_ACTIONS } from '../../redux/actions/contactActions';


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        // backgroundColor: '#EF8902',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 230,
      },
      button: {
          backgroundColor: '#EF8902',
      }

});

const mapStateToProps = state => ({
  user: state.user,

});
class ContactInfoView extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            contact: {
                first_name: '',
                last_name: '',
                email: '',
                location_address: '',
                phone_number: '',
            }
        }
      }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    }// end componentDidMount

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
        this.props.history.push('home');
        }
    } // end componentDidUpdate

    handleChange = (contactInfo) => (event) => {
        console.log(`in handleChange`)
        this.setState({
            contact: {
                ...this.state.contact,
                [contactInfo]: event.target.value,
                // username: this.props.user.userName
            }
        })
        console.log(this.state.contact)
    }// end handle change

    submitContactInfo = (event) => {
        console.log(`in submitContactInfo`)
        event.preventDefault();
        this.props.dispatch({ type: CONTACT_ACTIONS.POST_CONTACT,  payload: this.state.contact});
        
    }// end submitContactInfo

  render() {
    let content = null;
    const { classes } = this.props;

    if (this.props.user.userName) {
      content = (
        <div>
            <Paper>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="first_name"
                    placeholder="First Name"
                    value={this.state.first_name}
                    className={classes.textField}
                    onChange={this.handleChange('first_name')}
                    margin="normal"
                />
                <TextField
                    id="last_name"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    className={classes.textField}
                    onChange={this.handleChange('last_name')}
                    margin="normal"
                />
                <TextField
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    className={classes.textField}
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <TextField
                    id="location_address"
                    placeholder="Street Address City, State Zip"
                    value={this.state.location_address}
                    className={classes.textField}
                    onChange={this.handleChange('location_address')}
                    margin="normal"
                />
                <TextField
                    id="phone_number"
                    placeholder="Phone Number"
                    value={this.state.phone_number}
                    className={classes.textField}
                    onChange={this.handleChange('phone_number')}
                    margin="normal"
                />
            </form>
            <Button variant="contained" onClick={this.submitContactInfo} className={classes.button}>
                Submit
            </Button>
            </Paper>
        </div>
      );
    }

    return (
      <div>
        <Stepper />
        { content }
      </div>
    );
  }
}

ContactInfoView.propTypes = {
    classes: PropTypes.object,
  };

// this allows us to use <App /> in index.js
export default compose(withStyles(styles), connect(mapStateToProps))(ContactInfoView);