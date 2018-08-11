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
      height: '6vw',
      marginLeft: '0.5vw'
    },
    rate: {
      // padding: '6vw',
      marginTop: '1vw',
      borderRadius: '40vw',
      position:'relative',
      backgroundColor: '#A8A8A8',
      width: '60vw',
      height: '12vw',
    },
    roomname: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: 'white',
      position: 'absolute',
      float: 'left',
      fontSize: '3vw',
      marginTop: '5.5vw',
      marginLeft: '4vw'
      

    },
    circles: {
      marginTop: '3vw',
      float:'right',
      marginRight: '3vw',
    },
    RoomList: {
      marginTop: '10%',
      marginBottom: '10%'
    }
  };


class RoomComponent extends Component {

  handleClick = (event) => {
    this.setState({value: 3});
  }

render() {
    const { classes } = this.props;

    let content = null;
    if(this.props.rooms){
      content = (
        <div className={classes.RoomList}>
        
        {this.props.rooms.map(room => {
          
          return (
            <div className={classes.rate} key={room.room_id}>
              <p className={classes.roomname}>{room.room_name}</p>
              <Rating readonly
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
    return content;
  }
}

  RoomComponent.propTypes = {
    classes: PropTypes.object,
  };

export default compose(withStyles(styles), connect(mapStateToProps))(RoomComponent);




