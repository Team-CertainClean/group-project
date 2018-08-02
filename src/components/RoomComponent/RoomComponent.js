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
    rating: {
      height: '100'
    }
  };


class RoomComponent extends Component {

constructor(props){
    super(props);
    this.state = {
        room: {
            room_id:'',
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
      
      <Rating
  placeholderRating={3.0}
  emptySymbol={<img src="/RatingIconGrey.png" />}
  placeholderSymbol={<img src="/RatingIconOrange.png" className="icon" />}
  fullSymbol={<img src="/RatingIconOrange.png" className="icon" />}
/>
      </div>
    );
  }
}

  RoomComponent.propTypes = {
    classes: PropTypes.object,
  };

export default compose(withStyles(styles), connect(mapStateToProps))(RoomComponent);




