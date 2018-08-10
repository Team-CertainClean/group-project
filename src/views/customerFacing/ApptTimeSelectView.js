import React, { Component } from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import RoomInfo from '../../components/RoomInfo/RoomInfo';
import TimeFinish from '../../components/TimeFinish/TimeFinish';
import ApptCalendar from '../../components/ApptCalendar/ApptCalendar';
import Button from '@material-ui/core/Button';
import BackButton from '../../components/BackButton/BackButton';

const styles = {
    view: {
        backgroundColor: 'lightgrey',
    },
    calendar: {
        width: '90vp',
    }
};

class ApptTimeSelectView extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.view}>

                {/* <ContactInfo className={classes.contact} /> */}
                {/* <RoomInfo className={classes.room} /> */}
                <TimeFinish className={classes.time} />
                <ApptCalendar className={classes.calendar} />
                <BackButton scroll={this.props.scroll} offset={2}/>
                <Button onClick={() => this.props.scroll(4)}>Next</Button>
            </div>
        );
    }
}

ApptTimeSelectView.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles))(ApptTimeSelectView);