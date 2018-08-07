import React, { Component } from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import RoomInfo from '../../components/RoomInfo/RoomInfo';
import TimeFinish from '../../components/TimeFinish/TimeFinish';
import ApptCalendar from '../../components/ApptCalendar/ApptCalendar';
import Stepper from '../../components/Stepper/Stepper';
import Button from '@material-ui/core/Button';

const styles = {
    view: {
        backgroundColor: 'lightgrey',
    },
};

class ApptTimeSelectView extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.view}>
                <Stepper activeStep={1}/>
                <ContactInfo className={classes.contact} />
                {/* <RoomInfo className={classes.room} /> */}
                <TimeFinish className={classes.time} />
                <ApptCalendar className={classes.calendar} />
                <Button onClick={() => this.props.history.push('contact')}>Next</Button>
            </div>
        );
    }
}

ApptTimeSelectView.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles))(ApptTimeSelectView);