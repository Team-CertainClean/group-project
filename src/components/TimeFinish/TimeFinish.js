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
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  locationTypeContent: {
    marginTop: '7vh',
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
            <div>
                        <center className={classes.locationTypeContent}>
                           Your estiamte time is {this.props.estimate} hrs.
                        </center>
            </div>
        );
    }
}

TimeFinish.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(TimeFinish);