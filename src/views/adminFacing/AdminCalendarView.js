import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { AVAILABILITY_ACTIONS } from '../../redux/actions/availabilityActions'; 
import ApptCalendar from '../../components/ApptCalendar/ApptCalendar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Nav from '../../components/Nav/Nav';
import sweetAlertSuccess from '../../redux/modules/sweetAlertSuccess';

const mapStateToProps = state => ({
    user: state.user,
});

const styles = {
    view: {  
        position: 'absolute',
        width: '100vw',
        height: '100vh',
    background: 'linear-gradient(to bottom, white 0%,  lightgrey 100%)',
        },
    saveButton: {
        marginTop: '30px',
        display: 'inline-block',
        backgroundSize: '200% auto',
        transition: '0.5s',
        backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #fe981e 100%)',
        borderRadius: '200px',
        display: 'flex',
        backgroundColor: '#ef8902',
        marginTop: '1vw',
        margin: '1vw',
        padding: '2%',
        paddingLeft: '4%',
        paddingRight: '4%',
        fontSize: '2vw',
        color: 'white !important',
        '&:hover': {
          backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,#fbad40 100%)',
          backgroundColor: '#E8E8E8',
          backgroundPosition: 'right center'
        }
    },
    calendar: {
        position: 'absolute',
        width: '100vw',
    },
    calendarbox: {
        marginTop: '5vw',
        margin: '0 auto'
    }
    
    
};

class AdminCalendarView extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    saveAvailability = (event) => {
        this.props.dispatch({ type: AVAILABILITY_ACTIONS.POST });
        sweetAlertSuccess(`Cleaner availability saved and customer scheduler updated.`);
    }

    render() {
        const { classes } = this.props;
        let nav = null;
        let apptCalendar = null;
        let button = null;

        if (this.props.user.userName) {
            nav = ( <Nav history={this.props.history} /> );
            apptCalendar = ( <ApptCalendar className={classes.calendar} userType={'admin'} /> );
            button = (<Button variant="contained" onClick={this.saveAvailability} className={classes.saveButton}>Save</Button> )

        };
        return (
            <div className={classes.view}>
                { nav }
                {/* <Nav history={this.props.history}/> */}
                <center className={classes.calendarbox}>
                    { apptCalendar }
                    {/* <ApptCalendar className={classes.calendar} userType={'admin'}/> */}
                </center>
                <center>
                    { button }
                    {/* <Button variant="contained" onClick={this.saveAvailability} className={classes.saveButton}>Save</Button> */}
                </center>
            </div>
        );
    }
}

AdminCalendarView.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles),connect(mapStateToProps))(AdminCalendarView);