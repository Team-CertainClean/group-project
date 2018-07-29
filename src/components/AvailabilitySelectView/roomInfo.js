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
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: '100px',
    maxWidth: '100%',
  },
};

const mapStateToProps = state => ({
    user: state.user,
});

class RoomInfo extends Component {
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
                            TYPE:
                        </Typography>
                        <Typography className={classes.title} color="textPrimary">
                            ROOMS:
                        </Typography>
                        <Typography className={classes.title} color="textPrimary">
                            CLEANERS:
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="small">
                            + ADD ROOM
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

RoomInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(RoomInfo);