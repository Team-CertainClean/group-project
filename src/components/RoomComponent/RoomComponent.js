import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from 'react-rating';


const mapStateToProps = state => ({
    user: state.user,
    rooms: state.customer.rooms
  });



const styles = {
    icon: {
      float: 'left',
      height: '16px',
      margin: '3px',
      marginTop: '7px'
    },
    rate: {
      borderRadius: '15px',
      position:'relative',
      backgroundColor: '#A8A8A8',
      width: '260px',
      height: '30px',
      
    },
    roomname: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: 'white',
      position: 'absolute',
      float: 'left',
      marginTop: '7px',
      marginLeft: '13px',
    },
    circles: {
      float:'right',
      marginRight:'5px',
      paddingBottom: '10px'
    }
  };


class RoomComponent extends Component {

  handleClick = (event) => {
    this.setState({value: 3});
  }

render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.rooms.map(room => {
          return (
            <div className={classes.rate} key={room.room_id}>
              <p className={classes.roomname}>{room.room_name}</p>
              <Rating 
                className={classes.circles}
                initialRating={room.cleanliness_score}
                placeholderRating={Number(room.cleanliness_score)}
                emptySymbol={<img src="/RatingIconGrey.png" className={classes.icon}/>}
                placeholderSymbol={<img src="/RatingIconOrange.png" className={classes.icon} />}
                fullSymbol={<img src="/RatingIconOrange.png" className={classes.icon} />}
              />
            </div>
          );
        })

        }
      </div>
    );
  }
}

  RoomComponent.propTypes = {
    classes: PropTypes.object,
  };

export default compose(withStyles(styles), connect(mapStateToProps))(RoomComponent);




