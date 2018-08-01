import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Stepper from '../../components/Stepper/Stepper';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { ROOM_ACTIONS } from '../../redux/actions/roomActions';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
    user: state.user,
  
  });


const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

  
  class RoomInputView extends Component {
      
      constructor(props){
          super(props);
          this.state = {
              room: {
                  room_id:'',
                  cleanliness_score:'',
              }
          }
        }
  
      componentDidMount() {
          this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
      }// end componentDidMount
  
      componentDidUpdate() {
          if (!this.props.user.isLoading && this.props.user.userName === null) {
          this.props.history.push('home');
          }
      } // end componentDidUpdate
  
      handleChange = (contactInfo) => (event) => {
          console.log(`in handleChange`)
          this.setState({
              contact: {
                  ...this.state.contact,
                  [contactInfo]: event.target.value,
                  // username: this.props.user.userName
                  cleaning_type: event.target.value
              }
          })
          console.log(this.state.contact)
      }// end handle change
  
      submitContactInfo = (event) => {
          console.log(`in submitContactInfo`)
          event.preventDefault();
          this.props.dispatch({ type: ROOM_ACTIONS.POST_ROOM,  payload: this.state.contact});
      }// end submitContactInfo
  
    render() {
      let content = null;
      const { classes } = this.props;
  
      if (this.props.user.userName) {
        content = (
          <div>
               <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Word of the Day
          </Typography>
          <Typography variant="headline" component="h2">
            
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <Typography component="p">
            well meaning and kindly.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
          </div>
        );
      }
  
      return (
        <div>
          <Stepper />
          { content }
        </div>
      );
    }
  }

  RoomInputView.propTypes = {
      classes: PropTypes.object,
    };
  
  export default compose(withStyles(styles), connect(mapStateToProps))(RoomInputView);