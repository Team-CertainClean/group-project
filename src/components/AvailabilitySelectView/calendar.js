import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const styles = {
  calendar: {
    height: '100%',
  },
};

const mapStateToProps = state => ({
    user: state.user,
});

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [{
                start: new Date(),
                end: new Date(moment().add(1, "hours")),
            }],
        }
    }    

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    onSelect = (range) => {
        console.log(range);
        this.setState({
            ...this.state, ...this.state.events[0], start: new Date(range.start), end: new Date(range.end) 
        });
        console.log('this.state=', this.state);
        return true
    }    

    render() {
        const { classes } = this.props;
        return (
            <div>
                <BigCalendar 
                className={classes.calendar}
                defaultDate={new Date()}
                defaultView="week"
                views={{
                    week: true,
                }}
                events={this.state.events}
                selectable="true"
                step="30"
                onSelecting={this.onSelect}
                />
            </div>
        );
    }
}

Calendar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(Calendar);