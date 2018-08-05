import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const styles = {
  calendar: {
    height: '100%',
    width: 'auto',
  },
};

const mapStateToProps = state => ({
    user: state.user,
});

class ApptCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appt: [
                {
                start: null,
                end: null,
                },
            ],
        }
    }    

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    onSelect = (slotInfo) => {
        console.log('slotInfo:', slotInfo);
        this.setState({
            appt: [...this.state.appt, {start: new Date(slotInfo.start), end: new Date(slotInfo.end)}],
        });
        console.log('this.state=', this.state);
        return true;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <BigCalendar 
                className={classes.calendar}
                defaultDate={new Date()}
                defaultView={BigCalendar.Views.WEEK}
                views={{
                    week: true,
                }}
                events={this.state.appt}
                selectable={true}
                step={30}
                min={new Date(2018, 7, 2, 5)}
                max={new Date(2018, 7, 2, 20)}
                onSelectSlot={this.onSelect}
                />
            </div>
        );
    }
}

ApptCalendar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(ApptCalendar);