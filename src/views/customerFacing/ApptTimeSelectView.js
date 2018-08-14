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
        //paddingTop: '5vw',
        background: 'linear-gradient(to bottom, white 0%, lightgrey 20%, lightgrey 80%, white 100%)',
        paddingBottom: '20vw'
    },
    //small one
	unselectedLocationType: {
        marginTop: '1vw',
        margin: '1vw',
        padding: '1%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderRadius: '100px',
        fontSize: '2vw',
        color: 'white',
        border: '0.2vw solid white' ,
        '&:hover': {
            border: '0.2vw solid rgba(255,255,255,0.5)'
        },
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

                {/* <ContactInfo className={classes.contact} /> */}
                {/* <RoomInfo className={classes.room} /> */}
                <TimeFinish className={classes.time} />
                <center>
                    <ApptCalendar className={classes.calendar} userType={'customer'}/>
                </center>
                <center>
                <BackButton className={classes.backButton} scroll={this.props.scroll} offset={2}/>
                <Button className={classes.unselectedLocationType} onClick={() => this.props.scroll(4)}>Next</Button>
                </center>
            </div>
        );
    }
}

ApptTimeSelectView.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default compose(withStyles(styles))(ApptTimeSelectView);