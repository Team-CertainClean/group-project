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
    saveButton: {
        height: '40px',
        marginTop: '30px',
        float: 'right',
        // marginRight: '10px',
    },
    calendar: {
        position: 'absolute',
        width: '100vw',
        marginRight: '-10px',
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
        return (
            <div className={classes.view}>
                <Nav />
                <br/>
                <br/>
                <div className={classes.saveButton}>
                    <Button variant="contained" onClick={this.saveAvailability}>Save</Button>
                </div>    
                <ApptCalendar className={classes.calendar} userType={'admin'}/>
            </div>
        );
    }
}

AdminCalendarView.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles),connect(mapStateToProps))(AdminCalendarView);