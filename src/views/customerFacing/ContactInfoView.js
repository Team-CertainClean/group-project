import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';
import { REQUEST_ACTIONS } from '../../redux/actions/requestActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


import swal from 'sweetalert';
import SweetAlertSuccess from '../../redux/modules/sweetAlertSuccess';
import BackButton from '../../components/BackButton/BackButton';


const styles = theme => ({

      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 230,
        margin: '1%',
        padding: '2.5%',
        paddingLeft: '4%',
        paddingRight: '4%',
        borderRadius: '100px',
        backgroundColor: '#EF8902',
        color: 'white'
      },
      button: {
        backgroundColor: '#EF8902'
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      input: {
        paddingLeft: '4%',
        paddingRight: '4%',
        borderRadius: '100px',
          color: 'white'
      },
      getStartedButton: {
        borderRadius: '100px',
        display: 'flex', 
        backgroundColor: '#ef8902',
        marginTop: '5%',
        padding: '2.5%',
        paddingLeft: '4%',
        paddingRight: '4%',
        fontSize: 48,
        color: 'white !important'
        
    },

});

const mapStateToProps = state => ({
  user: state.user,
  requests: state.request,
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
                cleaning_type_id: null,
            },
        }
      }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        this.props.dispatch({type: REQUEST_ACTIONS.FETCH})
    }// end componentDidMount

    handleChange = (contactInfo) => (event) => {
        console.log(`in handleChange`)
        this.setState({
            contact: {
                ...this.state.contact,
                [contactInfo]: event.target.value,
            }
        })
        console.log(this.state.contact)
    }// end handle change


    runSweet(){
        swal({
        title: "Does this all look correct?",
        text: "Figure out a way to insert the things!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willSubmit) => {
        if (willSubmit) {
            this.submitContactInfo();
            swal("Great! Your request file has been submitted!", {
                icon: "success",
            });
        } else {
          swal("Press back and make your edits!");
        }
      });
    }

     submitContactInfo = async () => {
        console.log(`in submitContactInfo`)
        await this.props.dispatch({ type: CUSTOMER_ACTIONS.CONTACT,  payload: this.state.contact});
        await this.props.dispatch({type: CUSTOMER_ACTIONS.POST});
        await swal("Thank you! We will contact you soon with your estimate.");
        window.location.reload();
    }// end submitContactInfo

  render() {
    let content = null;
    const { classes } = this.props;

      content = (
            
            <form  noValidate autoComplete="off">
                <TextField
                    id="first_name"
                    placeholder="First Name"
                    value={this.state.first_name}
                    className={classes.textField}
                    onChange={this.handleChange('first_name')}
                    InputProps={{ className: classes.input }}
                />
                <TextField
                    id="last_name"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    className={classes.textField}
                    onChange={this.handleChange('last_name')}
                    InputProps={{ className: classes.input }}
                /> 
                <TextField
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    className={classes.textField}
                    onChange={this.handleChange('email')}
                    InputProps={{ className: classes.input }}
                />
                <TextField
                    id="location_address"
                    placeholder="Street Address City, State Zip"
                    value={this.state.location_address}
                    className={classes.textField}
                    onChange={this.handleChange('location_address')}
                    InputProps={{ className: classes.input }}
                />
                <TextField
                    id="phone_number"
                    placeholder="Phone Number"
                    value={this.state.phone_number}
                    className={classes.textField}
                    onChange={this.handleChange('phone_number')}
                    InputProps={{ className: classes.input }}
                />
                {this.props.selection ? 
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="cleaning_type_id"> Cleaning Type</InputLabel>
                    <Select
                        className={classes.input}
                        value={this.state.cleaning_type_id}
                        onChange={this.handleChange('cleaning_type_id')}
                        input={<Input name="cleaning_type_id" id="cleaning_type_id" />}
                    >
                    {/* {this.props.requests.map((option, i) => {
                        return (
                                <MenuItem key={i}>{option.request_info.cleaning_type}</MenuItem> 
                                );
                            }
                        )
                    } */}
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={3}>Home</MenuItem>
                        <MenuItem value={2}>Airbnb</MenuItem>
                        <MenuItem value={1}>Move Out</MenuItem>

                    </Select>
                    <FormHelperText>Please select your cleaning type:</FormHelperText>
                </FormControl>
                : null } 
                <Button variant="contained" onClick={this.submitContactInfo} className={classes.getStartedButton}>
                Get Quote
            </Button>
            <BackButton scroll={this.props.scroll} offset={this.props.selection ? 3 : 1}/>
            </form>
                
            
      );

    return (
      <div>
        <pre>{JSON.stringify(this.props.requests)}</pre>

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