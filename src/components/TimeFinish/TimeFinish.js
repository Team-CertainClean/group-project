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
        width: '70vw',
        fontSize: '2.2vw',
        color: 'white',
        backgroundColor: '#A8A8A8',
        borderRadius: '200vw',
        paddingTop: '2vw',
        paddingBottom: '2vw',
        marginBottom: '1vw',
        marginTop: '.5vw',
    },
    direction: {
        marginTop: '3vh',
        marginBottom: '3vh',
		width: '100vw',
		backgroundColor: 'white',
		fontSize: '2vh',
		padding: '1vw'
    },
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
            <div className={classes.card}>
                <center>
                    <center className={classes.durationEstimate}>
                        Your estimated service duration: {this.props.estimate} hours
                    </center>
                </center>
                <center className={classes.direction}>
                    Click on an available start time (white space) and drag to fill a time slot equal to your estimated service duration
				</center>
            </div>
        );
    }
}

TimeFinish.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(TimeFinish);