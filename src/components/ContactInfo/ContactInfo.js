import React, { Component } from 'react';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const styles = {
  card: {
    width: '250px',
  },
  media: {
    height: 'auto',
    width: '80%',
  },
  contactButton: {
      
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
};

const mapStateToProps = state => ({

});

class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // componentDidMount() {
        
    // }

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
                    <CardActions>
                        <Button className={classes.contactButton} variant="contained" size="small">
                            <a href='http://certainclean.com/#contact'>Contact Us</a>
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary">
                            <Icon>phone</Icon>
                            (612) 306-9593
                        </Typography>
                        <Typography className={classes.title} color="textSecondary">
                            <Icon>email</Icon>
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