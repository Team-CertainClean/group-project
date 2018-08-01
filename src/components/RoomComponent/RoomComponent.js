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


class RoomComponent extends Component {

constructor(props){
    super(props);
    this.state = {
        room: {
            room_id:'',
            cleanliness_score:'',
        }
    }
  }

render() {
    
    return (
      <div>
      
        <Rating />
      </div>
    );
  }
}
  RoomComponent.propTypes = {
    classes: PropTypes.object,
  };

export default compose(withStyles(styles), connect(mapStateToProps))(RoomComponent);