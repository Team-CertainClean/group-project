import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';
import { REQUEST_ACTIONS } from '../../redux/actions/requestActions';
import { CLEANING_TYPE_ACTIONS } from '../../redux/actions/cleaningTypeActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
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
  cleaningTypes: state.cleaningTypes
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
                cleaning_type_id: '',
            },
            cleaning_type: null,
        }
      }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        this.props.dispatch({type: CLEANING_TYPE_ACTIONS.FETCH})
    }// end componentDidMount

    handleChange = (contactInfo) => (event) => {
        console.log(`in handleChange`)
        console.log(event.target.value);
        console.log(this.props.cleaningTypes[event.target.value - 1].cleaning_type);
        this.setState({
            contact: {
                ...this.state.contact,
                [contactInfo]: event.target.value,
            },
            cleaning_type: this.props.cleaningTypes[event.target.value - 1].cleaning_type
        });
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
        await swal({
            title: "Are you sure?",
            text: "Thank you! We will contact you soon with your estimate.",
            icon: "success",
            buttons: ["No", "Confirm"],
            dangerMode: true,
          }).then( async (willSubmit)=>{
            if (willSubmit) {
                await this.props.dispatch({ type: CUSTOMER_ACTIONS.CONTACT,  payload: this.state.contact});
                await this.props.dispatch({type: CUSTOMER_ACTIONS.POST});
                await swal("Great! Your request file has been submitted!", {
                    icon: "success",
                });
                window.location.reload();
            } else {
              swal("Press back and make your edits!");
            }
          });

    }// end submitContactInfo

  render() {
    let content = null;
    const { classes } = this.props;
    console.log(this.state.cleaning_type);
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
                        value={this.state.cleaning_type}
                        onChange={this.handleChange('cleaning_type_id')}
                    >
                        <MenuItem value={this.state.cleaning_type} disabled>
                        {this.state.cleaning_type}
                        </MenuItem>
                        {this.props.cleaningTypes.map((option, i) => {
                            return (
                                    <MenuItem key={i} value={option.id}>{option.cleaning_type}</MenuItem> 
                                    );    
                            })
                        }
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