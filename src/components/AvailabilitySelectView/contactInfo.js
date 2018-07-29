import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
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

class ContactInfo extends Component {
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
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src="http://2z07ed4715q54iaau2dycc3r.wpengine.netdna-cdn.com/wp-content/uploads/2016/01/CC-Wordmark-Orange-Trans.png"
                        title="cctextlogo"
                    />
                    <CardContent>
                        <Typography className={classes.title} color="textPrimary">
                            certainclean
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="small">
                            <a href={this.state.url}>Contact Us</a>
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            (612) 306-9593
                        </Typography>
                        <Typography className={classes.title} color="textSecondary">
                            bookings@certainclean.com
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

ContactInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default compose(withStyles(styles),connect(mapStateToProps))(ContactInfo);