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
      height: '6vh',
      marginLeft: '0.5vw'
    },
    rate: {
      borderRadius: '40vw',
      position:'relative',
      backgroundColor: '#A8A8A8',
      width: '60vw',
      height: '10vh',
      border: '1px solid red',
      marginTop: '1vh',
      
    },
    roomname: {
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: 'white',
      position: 'absolute',
      float: 'left',
      fontSize: '6vh',
      marginTop: '4.5vh',
      marginLeft: '3vw',
      

    },
    circles: {
      float:'right',
      marginTop: '2vh',
      marginRight: '3vw',
    },
    RoomList: {
      border: '1px solid yellow',
      marginTop: '10%'
    },
    fakerate: {
     opacity: '0.5'
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




