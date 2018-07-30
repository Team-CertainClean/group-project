import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ContactInfo from './contactInfo';
import RoomInfo from './roomInfo';
import TimeAndInfo from './timeAndFinish';
import Calendar from './calendar';

const mapStateToProps = state => ({
    user: state.user,
});

const styles = {
    contact: {
        width: '20%',
    },
    room: {
        width: '20%',
    },
    time: {
        width: '20%',
    },
    calendar: {
        width: '20%',
    },
};

class AvailabilitySelectView extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <ContactInfo className={classes.contact} />
                <RoomInfo className={classes.room} />
                <TimeAndInfo className={classes.time} />
                <Calendar className={classes.calendar} />
            </div>
        );
    }
}

AvailabilitySelectView.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles),connect(mapStateToProps))(AvailabilitySelectView);