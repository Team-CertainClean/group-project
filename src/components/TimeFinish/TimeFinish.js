import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        width: '100vw',
    },
    durationEstimate: {
        // backgroundColor: '',
        fontSize: '24px',
        marginLeft: '10px',
    },
    direction: {
        // backgroundColor: 'white',
        marginLeft: '10px',
        fontSize: '20px',
        paddingBottom: '10px',
    }
  
};

const mapStateToProps = state => ({
    estimate: state.customer.duration
});

class TimeFinish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://certainclean.com/#contact',
        }
    }

    // componentDidMount() {
        
    // }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography className={classes.durationEstimate}>
                    Your estimated service duration: {this.props.estimate} hours
                </Typography>
                <Typography className={classes.direction}>
                    Click on an available start time (white space) and drag to fill a time slot equal to your estimated service duration.
                </Typography>
            </div>
        );
    }
}

TimeFinish.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(TimeFinish);