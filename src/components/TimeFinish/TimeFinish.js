import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    width: '250px',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
};

const mapStateToProps = state => ({
    user: state.user,
});

class TimeFinish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://certainclean.com/#contact',
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary">
                            ESTIMATE TIME:
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="small">
                            BOOK IT NOW
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

TimeFinish.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(TimeFinish);