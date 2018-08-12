import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// Component Imports
import { Link } from 'react-router-dom';

//Parallax
import { Parallax, ParallaxLayer } from 'react-spring';
import { Transition, animated } from 'react-spring'

import ContactInfoView from './ContactInfoView';
import ApptTimeSelectView from './ApptTimeSelectView';
import RoomInputView from './RoomInputView';

// const url = (name, wrap = false) => `${wrap ? 'url(' : ''}public/${name}.jpg${wrap ? ')' : ''}`
const styles = {
    fontFamily: 'Open Sans ,sans-serif',
	fontSize: 14,
	lineHeight: '10px',
	alignItems: 'center',
	justifyContent: 'center',
   
	bookNow: {
        backgroundSize: '200% auto',
        flex: '1 1 auto',
        transition: '0.5s',
        backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #ef8902 100%)',
		marginTop: '4%',
		paddingLeft: '4vw',
		paddingRight: '4vw',
		padding: '2vw',
		borderRadius: '100px',
		display: 'absolute',
		color: 'white',
		// backgroundColor: '#ef8902',
		//backgroundColor: '#ef8902',
		'&:hover': {
            backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,fbad40 100%)',
            backgroundPosition: 'right center',
		}
	},
	selectedLocationType: {
		margin: '1%',
		padding: '2.5%',
		paddingLeft: '4%',
		paddingRight: '4%',
		borderRadius: '100px',
		color: '#fe981e',
		fontSize: '3vw',
		backgroundColor: 'white !important',
		
	},
	unselectedLocationType: {
        
		margin: '1%',
		padding: '2.5%',
		paddingLeft: '4%',
		paddingRight: '4%',
		borderRadius: '100px',
		fontSize: '3vw',
        color: 'white',
        border: '0.2vw solid white' ,
        '&:hover': {
            border: '0.2vw solid rgba(255,255,255,0.5)'

		}
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
            backgroundPosition: 'right center',
		}
	},
	getStartedLink: {
		color: 'white !important',
		textDecorationLine: 'none'
	},
	typeOfProperty: {
		zIndex: '2',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '10%',
	},
	typeOfPropertyContent: {
	
		
	},
	center: {
		width: '100%',
		height: '80%'
	},
	locationTypeContent: {
        marginTop: '7vh',
        width: '100vw',
        backgroundColor: 'white',
        fontSize: '1vw',
        padding: '1vw'
	},
	water: {
		opacity: '0.3',
		zIndex: '-1',
		position: 'absolute',
		'-webkit-mask-image': '-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))',
		maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
	},
	logo: {
		marginTop: '5%',
		position: 'absolute',
		'-webkit-animation': 'fadein 4s',
		'-moz-animation': 'fadein 4s',
		'-ms-animation': 'fadein 4s',
		'-o-animation': 'fadein 4s',
		animation: 'fadein 4s'
	},
	propertypics: {
		opacity: '0.5',
		zIndex: '-1',
		marginTop: '-20%',
		width: '20%',
		height: 'auto'
    }
   
};

const mapStateToProps = (state) => ({
	user: state.user,
	state
});


// const pages = [
//     style => <animated.div style={{ ...style, background: "url('/Home.jpg')" }}>A</animated.div>,
//     style => <animated.div style={{ ...style, background: "url('/Office.jpg')" }}>B</animated.div>,
//     style => <animated.div style={{ ...style, background: '#ef8902' }}>C</animated.div>
//   ]
  
class CustomerLandingView extends React.Component {
	constructor() {
		super();
		this.state = { selection: null, path: '/roominput', propertytype: null, index: 0};
	}
    // toggle = e => this.setState(state => ({ index: state.index === 2 ? 0 : state.index + 1 }))
  
	selectLocationType = (type) => {
		if (type === 'residential') {
           
			this.setState({ selection: true, propertytype: 'residential' });
            this.props.dispatch({ type: CUSTOMER_ACTIONS.LOCATION, payload: 1 });
		} else {
			this.setState({ selection: false, propertytype: 'commercial' });
			this.props.dispatch({ type: CUSTOMER_ACTIONS.LOCATION, payload: 2 });
		}
	};

	scroll = (n) => {
		this.refs.parallax.scrollTo(n);
	};

	render() {
		const { classes } = this.props;
		let content,
			layer,
			locationTypeChoices,
			locationTypeTitle,
			locationTypeContent = null;
		let numberofpages = 2;
		// Create layerBackground object to store continuous styles
		let layerBackground = {
			// '@keyframes fadeIn': {
			// 	to: {
			// 		opacity: 1
			// 	},
			// 	from: {
			// 		opacity: 0
			// 	}
			// },
			// '-webkit-animation': 'fadein 4s',
			// '-moz-animation': 'fadein 4s',
			// '-ms-animation': 'fadein 4s',
			// '-o-animation': 'fadein 4s',
			
			position: 'relative',
			float: 'left',
			width: '100vw',
			maxHeight: '75vw',
			backgroundPosition: '50% 50%',
			backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            
		};
		// Conditional check to apply either a background color or background image based on state
		if (this.state.propertytype === 'residential') {
            
            layerBackground.backgroundImage = "url('/Home.jpg')";
            setTimeout(layerBackground.transition = '0s', 5000);
		} else if (this.state.propertytype === 'commercial') {
            
            layerBackground.backgroundImage = "url('/Office.jpg')";
            setTimeout(layerBackground.transition = '0s', 5000);
		} else {
			layerBackground.backgroundColor = '#fe981e';
		}
        let RoomLayerBackground = {
          
        }
        let ContactLayerBackground ={

        }
        layerBackground.backgroundImage = "url('/Home.jpg')";
		if (this.state.selection === null) {
			locationTypeContent = (
				<Typography className={classes.locationTypeContent}>Please choose the type of your property.</Typography>
			);
			locationTypeChoices = (
				<div>
					<Button
						onClick={() => this.selectLocationType('residential')}
						className={classes.unselectedLocationType}
						value="residential"
					>
						Residential
					</Button>
					<Button
						onClick={() => this.selectLocationType('commercial')}
						className={classes.unselectedLocationType}
						value="commercial"
					>
						Commercial
					</Button>
				</div>
			);
		} else if (this.state.selection) {
			locationTypeContent = (
                <div>
				<Typography className={classes.locationTypeContent}>
					What to expect: You'll fill out our estimator to receive an estimated duration your cleaning will
					take and then we'll contact you when we've confirmed.
				</Typography>
					<Button className={classes.getStartedButton} onClick={() => this.refs.parallax.scrollTo(2)}>
						Get Started
					</Button>
                </div>
			);
			locationTypeChoices = (
				<div>
					<Button
						onClick={() => this.selectLocationType('residential')}
						className={classes.selectedLocationType}
					>
						Residential
					</Button>
					<Button
						onClick={() => this.selectLocationType('commercial')}
						className={classes.unselectedLocationType}
					>
						Commercial
					</Button>
				</div>
			);
		} else {
			locationTypeContent = (
                <div>
				<Typography className={classes.locationTypeContent}>
					What to expect: You'll be navigated to our contact form, and then we will get in touch to discuss
					the cleaning in further detail.
				</Typography>
					<Button className={classes.getStartedButton} onClick={() => this.refs.parallax.scrollTo(2)}>
						Get Started
					</Button>
                    </div>
			);
			locationTypeChoices = (
				<div>
					<Button
						onClick={() => this.selectLocationType('residential')}
						className={classes.unselectedLocationType}
					>
						Residential
					</Button>
					<Button
						onClick={() => this.selectLocationType('commercial')}
						className={classes.selectedLocationType}
					>
						Commercial
					</Button>
				</div>
			);
		}
		switch (this.state.propertytype) {
			case 'commercial':
				layer = <Parallax.Layer offset={2} speed={1} style={{  background: 'linear-gradient(to bottom, white 30%, grey 100%)'  }} />;
				numberofpages = 3;
				content = (
					<Parallax.Layer offset={2} speed={1} style={styles}>
						<ContactInfoView
							scroll={this.scroll}
							selection={this.state.selection}
							history={this.props.history}
						/>
					</Parallax.Layer>
				);

				break;
        	case 'residential':
				layer = (
					<div>
						<Parallax.Layer offset={2} speed={1} style={ RoomLayerBackground } />
						<Parallax.Layer offset={3} speed={1} style={{ backgroundColor: 'grey' }} />
						<Parallax.Layer offset={4} speed={1} style={{ background: 'linear-gradient(to bottom, white 30%, grey 100%)'  }} />
					</div>
				);
				numberofpages = 5;
				content = (
					<div>
						<Parallax.Layer offset={2} speed={1} style={styles}>
							<RoomInputView history={this.props.history} scroll={this.scroll} />
						</Parallax.Layer>
						<Parallax.Layer offset={3} speed={1} style={styles}>
							<ApptTimeSelectView scroll={this.scroll} history={this.props.history} />
						</Parallax.Layer>

						<Parallax.Layer offset={4} speed={1} style={styles}>
							<ContactInfoView
								scroll={this.scroll}
								selection={this.state.selection}
								history={this.props.history}
							/>
						</Parallax.Layer>
					</div>
				);
				break;

			default:
				break;
		}

		return (
			<Parallax ref="parallax" pages={numberofpages}>
				<Parallax.Layer offset={0} speed={1} style={{ backgroundColor: 'white' }} />
				<Parallax.Layer offset={1} speed={1} style={layerBackground}  />
				{layer}
				<Parallax.Layer offset={0} speed={5} style={styles} onClick={() => this.refs.parallax.scrollTo(1)}>
					<img src="/giphy.gif" width="100%" className={classes.water} />
					<center className="firstFade" className={classes.logo}>
						<img src="/LOGO-01.png" width="70%" />
						<div className="firstButton">
							<Button className={classes.getStartedButton} onClick={() => this.refs.parallax.scrollTo(1)}>
								BOOK NOW
							</Button>
						</div>
					</center>
                    
				</Parallax.Layer>
				<Parallax.Layer
					offset={1}
					speed={2}
					// style={{ backgroundImage: '', backgroundSize: 'cover' }}>
				><div className="main" onClick={this.toggle}>
              
              </div>
					<center className={classes.center}>
						<div className={classes.typeOfProperty}>
							<center>{locationTypeTitle}</center>
							<center> {locationTypeChoices} </center>
						</div>
						<div className={classes.typeOfPropertyContent}>{locationTypeContent}</div>
					</center>
				</Parallax.Layer>
				{content}
			</Parallax>
		);
	}
}

export default compose(withStyles(styles), connect(mapStateToProps))(CustomerLandingView);
