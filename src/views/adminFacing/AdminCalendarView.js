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

const mapStateToProps = state => ({
    user: state.user,
});

const styles = {
    view: {
        backgroundColor: 'lightgrey',
    },
};

class AdminCalendarView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    saveAvailability = (event) => {
        this.props.dispatch({ type: AVAILABILITY_ACTIONS.POST })
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.view}>
                <Typography>Admin Calendar View</Typography>
                <Button onClick={this.saveAvailability}>Save</Button>
                <ApptCalendar className={classes.calendar} userType={'admin'}/>
            </div>
        );
    }
}

AdminCalendarView.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles),connect(mapStateToProps))(AdminCalendarView);