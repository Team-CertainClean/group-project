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
wholeContact:{
    paddingBottom:'6vw',
},
grey: {
    fontSize: '1vw',
    color: 'black'
},
form: {
    width: '40vw',
},
selectField:{
  
		margin: '1%',
        padding: '1%',
        paddingLeft: '2%',
        paddingRight: '2%',
		borderRadius: '100vw',
		backgroundColor: 'grey',
		color: 'white !important',
		width: '40vw',
},
      textField: {
      
       width: '40vw',
        margin: '1%',
        padding: '1%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderRadius: '100px',
        backgroundColor: 'grey',
        color: 'white !important',
        display: 'flex',
      },
      button: {
        backgroundColor: '#EF8902'
      },
     
    
      getStartedButton:  {
        backgroundSize: '200% auto',
        flex: '1 1 auto',
        transition: '0.5s',
        backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #fe981e 100%)',
		borderRadius: '200px',
		display: 'flex',
		backgroundColor: '#ef8902',
		marginTop: '2%',
		padding: '2.5%',
		paddingLeft: '4%',
		paddingRight: '4%',
		fontSize: '3vw',
        color: 'white !important',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,#fbad40 100%)',
            backgroundColor: '#E8E8E8',
            backgroundPosition: 'right center',
		}
    },
    locationTypeContent: {
        marginBottom: '0.5vw',
        width: '100vw',
        backgroundColor: 'white',
        fontSize: '2vh',
        padding: '1vw',

    },
    protectionImg:{
        width: '3vw',
    },
    smallUnselectedLocationType: {
		float: 'left',
		marginTop: '3vw',
		margin: '1vw',
		padding: '2%',
		paddingLeft: '2%',
		paddingRight: '2%',
		borderRadius: '100px',
		fontSize: '2vw',
		color: 'grey',
		border: '0.2vw solid grey',
		'&:hover': {
			border: '0.2vw solid rgba(255,255,255,0.5)'
		}
    },
    input: {
    color:'white !important'
    }

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
                // needs to stay 1 to store commercial requests. DO NOT DELETE!
                cleaning_type_id: 1,
            },
            cleaning_type: null,
        }
      }

    componentDidMount() {
        this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
        this.props.dispatch({type: CLEANING_TYPE_ACTIONS.FETCH})
    }// end componentDidMount

    handleChange = (contactInfo) => (event) => {
        if(contactInfo === "cleaning_type_id"){
            this.setState({
                cleaning_type: this.props.cleaningTypes[event.target.value - 1].cleaning_type
            });
        } else {
            this.setState({contact: {
                ...this.state.contact, [contactInfo]: event.target.value
            }});
        }
    }// end handle change

     submitContactInfo = async () => {
        console.log(`in submitContactInfo`)
        await swal({
            title: "Are you sure?",
            text: "You didn't forget anything, did you?",
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
      content = (
            

            <center className={classes.wholeContact} noValidate autoComplete="on">
            <img src={'https://www.shareicon.net/data/128x128/2015/12/11/685826_sign_512x512.png'} className={classes.protectionImg}></img>

            <div className={classes.locationTypeContent}>
                    Almost done! Please enter your contact information, so we can send you as estimate.
				</div>
                <div className={classes.from}>
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
                <div>
                    <center className={classes.grey}>
                 Type:
				</center>
                     
                    <Select

              
                       className={classes.selectField}
                      

                        value={this.state.cleaning_type}

                        onChange={this.handleChange('cleaning_type_id')}
                    >
                        <MenuItem style={{width: '100%'}} value={this.state.cleaning_type} disabled>
                        {this.state.cleaning_type}
                        </MenuItem>
                        {this.props.cleaningTypes.map((option, i) => {
                            return (
                                    <MenuItem style={{width: '100%'}} key={i} value={option.id}>{option.cleaning_type}</MenuItem> 
                                    );    
                            })
                        }
                    </Select>
                    
                </div>
                : null } 
                <Button onClick={this.submitContactInfo} className={classes.getStartedButton} >
                Get Quote
            </Button>
            <BackButton  className={classes.smallUnselectedLocationType} scroll={this.props.scroll} offset={this.props.selection ? 3 : 1}/>
            </div> </center>
                
            
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