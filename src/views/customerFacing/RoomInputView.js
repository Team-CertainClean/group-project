import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from 'react-rating';
import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';
//Components
import RoomComponent from '../../components/RoomComponent/RoomComponent';
import BackButton from '../../components/BackButton/BackButton';

//Actions
import { ROOM_ACTIONS } from '../../redux/actions/roomActions';

//Modules
import estimateCalculator from '../../redux/modules/estimateCalculator';
import sweetAlertFailure from '../../redux/modules/sweetAlertFailure';
import sweetAlertSuccess from '../../redux/modules/sweetAlertSuccess';

// //Material UI
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const mapStateToProps = (state) => ({
	rooms: state.rooms.roomOptions,
	selectedRooms: state.customer.rooms
});

const styles = (theme) => ({
	modalStyle: {
		position: 'absolute',
		width: '60vw',
		backgroundColor: 'white',
		// boxShadow: theme.shadows[5],
		// padding: theme.spacing.unit * 6,
		borderRadius: '200vw',
		padding: '4vw'
	},

	smallGetStartedButton: {
		float: 'left',
		backgroundSize: '200% auto',
		transition: '0.5s',
		backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #fe981e 100%)',
		borderRadius: '200px',
		display: 'flex',
		backgroundColor: '#ef8902',
		marginTop: '3vw',
		margin: '1vw',
		padding: '2%',
		paddingLeft: '4%',
		paddingRight: '4%',
		fontSize: '2vw',
		color: 'white !important',
		'&:hover': {
			backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,#fbad40 100%)',
			backgroundColor: '#E8E8E8',
			backgroundPosition: 'right center'
		}
	},

	smallUnselectedLocationType: {
		float: 'left',
		marginTop: '3vw',
		margin: '1vw',
		padding: '2%',
		paddingLeft: '4%',
		paddingRight: '4%',
		borderRadius: '100px',
		fontSize: '2vw',
		color: 'grey',
		border: '0.2vw solid grey',
		'&:hover': {
			border: '0.2vw solid rgba(255,255,255,0.5)'
		}
	},
	selectedLocationType: {
		margin: '1%',
		padding: '2.5%',
		paddingLeft: '4%',
		paddingRight: '4%',
		borderRadius: '100px',
		color: '#ef8902',
		fontSize: 51,
		backgroundColor: 'white',
		'&:hover': {
			color: '#ef8902',
			backgroundColor: 'white'
		}
	},
//small one
	unselectedLocationType: {
		
			marginTop: '1vw',
		margin: '1vw',
		padding: '1%',
		paddingLeft: '2%',
		paddingRight: '2%',
			borderRadius: '100px',
			fontSize: '2vw',
			color: 'white',
			border: '0.2vw solid white' ,
			'&:hover': {
				border: '0.2vw solid rgba(255,255,255,0.5)'
	
			}
		
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
		float: 'left',
		height: '6.5vw',
		margin: '0.25vw'
	},
	circlesModal: {
		display: 'block',
		alignContent: 'center',
		width: '60vw'
		// backgroundColor: 'yellow'
	},
	circlesModalRateElements: {
		paddingLeft: '3.5vw',
		marginLeft: '9vw',
		// backgroundColor: 'blue',
		width: '38vw',
		position: 'static'
	},

	circlesModalRateElementsDirty: {
		color: 'grey',
		position: 'absolute',
		float: 'left',
		marginLeft: '4vw',
		marginTop: '3.1vw',
		fontSize: '1.5vw'
	},
	circlesModalRateElementsClean: {
		color: 'grey',
		float: 'right',
		marginRight: '4vw',
		marginTop: '3.1vw',
		fontSize: '1.5vw'
	},
	modalButtons:{
		alignContent: 'center',
		display: 'flex',
		justifyContent: 'center',
	},
	buttonsElement: {
		
	},
	roomDropDown: {
		marginTop: '30px'
	},
	whole: {
		display: 'block',
		overflow: 'auto',
		height: '100%',
		background: 'linear-gradient(to bottom, white 0%, lightgrey 20%, lightgrey 80%, white 100%)' , 
		paddingBottom: '10vw'
	},
	getStartedButton: {
		backgroundSize: '200% auto',
		flex: '1 1 auto',
		transition: '0.5s',
		backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #fe981e 100%)',
		borderRadius: '200px',
		display: 'flex',
		backgroundColor: '#ef8902',
		marginTop: '5%',
		padding: '2.5%',
		paddingLeft: '4%',
		paddingRight: '4%',
		fontSize: '3vw',
		color: 'white !important',
		'&:hover': {
			backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,#fbad40 100%)',
			backgroundColor: '#E8E8E8',
			backgroundPosition: 'right center'
		}
	},
	locationTypeContent: {
		marginTop: '7vh',
		width: '100vw',
		backgroundColor: 'white',
		fontSize: '2vh',
		padding: '1vw'
	},
	formControl: {
		borderBottom: ' 1px solid rgba(0, 0, 0, 0) !important'
	},
	roomDropDown: {
		fontSize: '4vw',
		margin: '1vw',
		padding: '1vw',
		borderRadius: '100vw',
		backgroundColor: 'grey',
		color: 'white',
		width: '40vw',
		height: '5vw',
		marginLeft: '9vw'
	},
	hoverDescription: {
		fontSize: '2vw',
		height: '2vw',
		color: 'black'
	}
});

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
				room_name: '',
				cleanliness_score: 0
			},
			roomName: '',
			hover: 0,
			setDes: false,
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false, roomName: '', room: {room_id: '', room_name: '', cleanliness_score: 0}, hover: 0, setDes: false });
	};

	componentDidMount() {
		this.props.dispatch({ type: ROOM_ACTIONS.FETCH });
	} // end componentDidMount

	handleChange = (event) => {
		this.setState({
			room: { ...this.state.room, room_id: event.target.value.id, room_name: event.target.value.room_name },
			roomName: event.target.value.room_name
		});
	}; // end handle change

	setScore = (rate) => {
		this.setState({ room: { ...this.state.room, cleanliness_score: rate }, setDes: true });
	};

	changeDescription = (rate) => {
		this.setState({  hover: rate });
		console.log(this.state.hover);
	};
	addRoomToReducer = () => {
		if (this.state.roomName != '') {
			this.props.dispatch({ type: CUSTOMER_ACTIONS.ROOMS, payload: this.state.room });
			this.handleClose();
			this.clearState();
		} else {
			sweetAlertFailure("You didn't choose a room! Please pick a room and rate it before adding.");
		}
	};

	clearState = () => {
		this.setState({ room: { room_id: '', room_name: '', cleanliness_score: 3 }, roomName: '' });
	};

	calcEstAndScrollToSchedule = () => {
		const estimate = estimateCalculator(this.props.selectedRooms);
		this.props.dispatch({ type: CUSTOMER_ACTIONS.DURATION, payload: estimate });
		this.props.scroll(3);
		// this.props.history.push('schedule');
	};

	render() {
		let HoverDescription;
		let content = null;

		if(this.state.setDes){
			switch (this.state.room.cleanliness_score) {
				case 1:
				
			HoverDescription = ('Very Messy');
					break;
	
				case 2:
			HoverDescription = ('Messy');
					break;
	
				case 3:
			HoverDescription = ('A Little Messy');
					break;
	
				case 4:
			HoverDescription = ('A Little Dust');
					break;
	
				case 5:
				HoverDescription = ('Clean But Needs A Refresh');
					break;
	
				default:
				
					break;
			}
		} else {
		switch (this.state.hover) {
			case 1:
			
		HoverDescription = ('Very Messy');
				break;

			case 2:
		HoverDescription = ('Messy');
				break;

			case 3:
		HoverDescription = ('A Little Messy');
				break;

			case 4:
		HoverDescription = ('A Little Dust');
				break;

			case 5:
			HoverDescription = ('Clean But Needs A Refresh');
				break;

			default:
			
				break;
		}
	}
		const { classes } = this.props;
		content = (
			<center className={classes.whole}>
				<Typography gutterBottom className={classes.locationTypeContent}>
					Select room that needs to be cleaned!{' '}
				</Typography>
				<RoomComponent />
				<div>
					<Button onClick={this.handleOpen} className={classes.getStartedButton}>
						Add room
					</Button>
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.open}
						onClose={this.handleClose}
					>
						<div style={getModalStyle()} className={classes.modalStyle}>
							<center>
								<Typography id="modal-title">Add kind of room and how clean it is.</Typography>
								<Typography id="simple-modal-description">
									To prevent misestimating please, input real information.
								</Typography>
							</center>

							<FormControl className={classes.formControl}>
								<center>
									<Select
										onChange={this.handleChange}
										className={classes.roomDropDown}
										value={this.state.roomName}
									>
										<MenuItem value={this.state.roomName} disabled>
											{this.state.roomName}
										</MenuItem>
										{this.props.rooms.map((room) => (
											<MenuItem key={room.id} value={room}>
												{room.room_name}
											</MenuItem>
										))};
									</Select>
								</center>
							</FormControl>

							<div className={classes.circlesModal}>
								<p className={classes.circlesModalRateElementsDirty}>Dirty</p>
								<Rating
									className={classes.circlesModalRateElements}
									onChange={(rate) => this.setScore(rate)}
									initialRating={this.state.room.cleanliness_score}
									emptySymbol={<img src="/RatingIconGrey.png" className={classes.iconModal} />}
									placeholderSymbol={
										<img src="/RatingIconOrange.png" className={classes.iconModal} />
									}
									fullSymbol={<img src="/RatingIconOrange.png" className={classes.iconModal} />}
									onHover={(rate) => this.changeDescription(rate)}
								/>
								<p className={classes.circlesModalRateElementsClean}>Clean</p>
							</div>
							
							<center className={classes.hoverDescription} >{HoverDescription}</center>

							<center className={classes.modalButtons}>
								<Button className={classes.smallUnselectedLocationType} onClick={this.handleClose}>Close</Button>
								<Button className={classes.smallGetStartedButton}onClick={this.addRoomToReducer} >Add room</Button>
							</center>
						</div>
					</Modal>
				</div>
				<center className={classes.buttonsElement}>
					<BackButton scroll={this.props.scroll} offset={1} />
					{this.props.selectedRooms.length > 0 ? (
						<Button className={classes.unselectedLocationType} onClick={this.calcEstAndScrollToSchedule}>
							Next
						</Button>
					) : null}
				</center>
			</center>
		);

		return <div>{content}</div>;
	}
}

RoomInputView.propTypes = {
	classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles), connect(mapStateToProps))(RoomInputView);
