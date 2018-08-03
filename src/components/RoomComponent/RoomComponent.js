import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from 'react-rating';


const mapStateToProps = state => ({
    user: state.user,
  
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

constructor(props){
    super(props);
    this.state = {
        room: {
            room_id:'KITCHEN',
            cleanliness_score:'',
            value: 0
        }
    }
  }

  handleClick = (event) => {
    this.setState({value: 3});
  }

render() {
    const { classes } = this.props;
    return (
      <div className={classes.rate}>
     <p className={classes.roomname}>{this.state.room.room_id}</p>
      <Rating 
      className={classes.circles}
      onChange={(rate) => alert(rate)}
      initialRating={this.state.value}
  placeholderRating={3.0}
  emptySymbol={<img src="/RatingIconGrey.png" className={classes.icon}/>}
  placeholderSymbol={<img src="/RatingIconOrange.png" className={classes.icon} />}
  fullSymbol={<img src="/RatingIconOrange.png" className={classes.icon} />}
/>
      </div>
    );
  }
}

  RoomComponent.propTypes = {
    classes: PropTypes.object,
  };

export default compose(withStyles(styles), connect(mapStateToProps))(RoomComponent);




