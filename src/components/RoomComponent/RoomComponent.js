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
    rate:{
      color: 'blue'
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
  placeholderRating={3.5}
  emptySymbol={<img src="https://upload.wikimedia.org/wikipedia/commons/4/48/Circle_Brown_Solid.svg" className="icon" />}
  placeholderSymbol={<img src="http://www.clker.com/cliparts/W/i/K/w/1/D/glossy-orange-circle-icon-md.png" className="icon" />}
  fullSymbol={<img src="https://www.iconsdb.com/icons/preview/orange/circle-xxl.png" className="icon" />}
/>
      <Rating {...this.props} initialRating={this.state.value} placeholderRating={3} />
        <button onClick={this.handleClick}>Reset</button>
       

      </div>
    );
  }
}

  RoomComponent.propTypes = {
    classes: PropTypes.object,
  };

export default compose(withStyles(styles), connect(mapStateToProps))(RoomComponent);




