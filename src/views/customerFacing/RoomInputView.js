import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from 'react-rating';
//Components
import RoomComponent from '../../components/RoomComponent/RoomComponent';
import Nav from '../../components/Nav/Nav';
import Stepper from '../../components/Stepper/Stepper';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { ROOM_ACTIONS } from '../../redux/actions/roomActions';

// //Material UI
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const mapStateToProps = (state) => ({
	user: state.user
});

const styles = (theme) => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 6,
		borderRadius: '200px'
	},
	card: {
		minWidth: 275
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
    margin: '30px',
		marginBottom: 16,
		fontSize: 10
  },
  subheading: {
    fontSize: 6
  },
	pos: {
		marginBottom: 12
	},
	iconModal: {
		float: 'right',
		height: '30px',
		margin: '3px',
		marginTop: '30px'
	},
	circlesModal: {
		float: 'right',
		marginRight: '5px',
		paddingBottom: '10px'
  },
  roomDropDown: {
    marginTop: '30px',
  }
});
function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

class RoomInputView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			room: {
				room_id: '',
				cleanliness_score: ''
			}
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	componentDidMount() {
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
	} // end componentDidMount

	componentDidUpdate() {
		if (!this.props.user.isLoading && this.props.user.userName === null) {
			this.props.history.push('home');
		}
	} // end componentDidUpdate

	handleChange = (contactInfo) => (event) => {
		console.log(`in handleChange`);
		// this.setState({
		// 	contact: {
		// 		...this.state.contact,
		// 		[contactInfo]: event.target.value,
		// 		// username: this.props.user.userName
		// 		cleaning_type: event.target.value
		// 	}
		// });
    // console.log(this.state.contact);
    this.setState({ [event.target.name]: event.target.value });
	}; // end handle change

	submitContactInfo = (event) => {
		console.log(`in submitContactInfo`);
		event.preventDefault();
		this.props.dispatch({ type: ROOM_ACTIONS.POST_ROOM, payload: this.state.contact });
	}; // end submitContactInfo

	render() {
		let content = null;
		const { classes } = this.props;

		if (this.props.user.userName) {
			content = (
				<center>
					{/* <Stepper /> */}
					<RoomComponent />
					<div>
						<Typography gutterBottom>Click to add room!</Typography>
						<Button onClick={this.handleOpen}>Add room</Button>
						<Modal
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
							open={this.state.open}
							onClose={this.handleClose}
						>
							<div style={getModalStyle()} className={classes.paper}>
								<Typography variant="title" id="modal-title">
									Add kind of room and how dirty it is.
								</Typography>
								<Typography variant="subheading" id="simple-modal-description">
									To prevent misestiamting please, input real information.
								</Typography>

                  <FormControl className={classes.formControl}>
          <Select
            value={this.state.room.room_id}
            onChange={this.handleChange}
            name="Room"
            className={classes.roomDropDown}
          >
            <MenuItem value="" disabled>
              ROOM
            </MenuItem>
            <MenuItem value={10}>KITCHEN</MenuItem>
            <MenuItem value={20}>BATHROOM</MenuItem>
            <MenuItem value={30}>LIVING ROOM</MenuItem>
          </Select>
          <FormHelperText>Select room that needs to be cleaned</FormHelperText>
        </FormControl>

								<Rating
									className={classes.circlesModal}
									onChange={(rate) => alert(rate)}
									initialRating={this.state.value}
									placeholderRating={3.0}
									emptySymbol={<img src="/RatingIconGrey.png" className={classes.iconModal} />}
									placeholderSymbol={<img src="/RatingIconOrange.png" className={classes.iconModal} />}
									fullSymbol={<img src="/RatingIconOrange.png" className={classes.iconModal} />}
								/>
                <center><Button>Add room</Button><Button>Close</Button></center>
							</div>
						</Modal>
					</div>
          
				</center>
			);
		}

		return <div>{content}</div>;
	}
}

RoomInputView.propTypes = {
	classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles), connect(mapStateToProps))(RoomInputView);
