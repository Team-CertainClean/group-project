import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import Stepper from '../../components/Stepper/Stepper';
import { USER_ACTIONS } from '../../redux/actions/userActions';


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


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
    }

    componentDidUpdate() {
        if (!this.props.user.isLoading && this.props.user.userName === null) {
        this.props.history.push('home');
        }
    }

    handleChange = (contactInfo) => {
        console.log(`in handleChange`)

    }// end handle change

    submitContactInfo(){
        console.log(`in submitContactInfo`)
    }// end submitContactInfo

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
            <Paper>
            <form noValidate autoComplete="off">
                <TextField
                    id="first_name"
                    placeholder="First Name"
                    value={this.state.first_name}
                    onChange={this.handleChange('first_name')}
                    margin="normal"
                />
                <TextField
                    id="last_name"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    onChange={this.handleChange('last_name')}
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
                    id="location_address"
                    placeholder="Street Address City, State Zip"
                    value={this.state.location_address}
                    onChange={this.handleChange('location_address')}
                    margin="normal"
                />
                <TextField
                    id="phone_number"
                    placeholder="Phone Number"
                    value={this.state.phone_number}
                    onChange={this.handleChange('phone_number')}
                    margin="normal"
                />
                

            </form>
            <Button variant="contained" onClick={this.submitContactInfo}>
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ContactInfoView);