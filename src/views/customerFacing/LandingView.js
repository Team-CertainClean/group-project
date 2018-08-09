import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// Component Imports
import { Link } from 'react-router-dom';

//Parallax
import { Parallax, ParallaxLayer } from 'react-spring'
import ContactInfoView from './ContactInfoView';
import ApptTimeSelectView from './ApptTimeSelectView';
import RoomInputView from './RoomInputView';

// const url = (name, wrap = false) => `${wrap ? 'url(' : ''}public/${name}.jpg${wrap ? ')' : ''}`
const styles = {
    fontFamily: 'Menlo-Regular, Menlo, monospace',
    fontSize: 14,
    lineHeight: '10px',
    color: 'white',
    alignItems: 'center', 
    justifyContent: 'center',
    bookNow:{
        
        paddingLeft: '2%',
        paddingRight: '2%',
        borderRadius: '60px',
        display: 'absolute', 
        color: 'white',
        backgroundColor: '#ef8902',
        '&:hover':{
            color: '#ef8902',
            backgroundColor: '#E8E8E8',
           
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
        '&:hover':{
            color: '#ef8902',
            backgroundColor: 'white'
        }
    },
    unselectedLocationType: {
        margin: '1%',
        padding: '2.5%',
        paddingLeft: '4%',
        paddingRight: '4%',
        borderRadius: '100px',
        fontSize: 48,
        color: 'white',
    },
    getStartedButton: {
        borderRadius: '100px',
        display: 'flex', 
        backgroundColor: '#ef8902',
        marginTop: '5%',
        padding: '2.5%',
        paddingLeft: '4%',
        paddingRight: '4%',
        fontSize: 48,
        color: 'white !important'
        
    },
    getStartedLink: {
        color: 'white !important',
        textDecorationLine: 'none',
       
    },
    typeOfProperty: {
        zIndex: '2',
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: '10%',
        width: '80%',
        height: '20%',
        
       
    },
    typeOfPropertyContent: {
        marginTop: '10%',
        fontSize: 25,
        color: 'white',
        width: '80%',
        height: '40%',
       

    },
    center: {
        width: '100%',
        height: '80%',
    },
    locationTypeContent: {
        fontSize: 25,
        color: 'white !important',
    
    },
    water: {
        opacity: '0.1',
        zIndex: '-1',
        position: 'absolute',
        '-webkit-mask-image':'-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))',
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))'
        
    },
    logo: {
        marginTop: '10%',
        position: 'absolute',

    '-webkit-animation': 'fadein 4s',
       '-moz-animation': 'fadein 4s',
        '-ms-animation': 'fadein 4s',
         '-o-animation': 'fadein 4s',
            'animation': 'fadein 4s'
    },
    propertypics: {
        opacity: '0.5',
        zIndex: '-1',
        marginTop:'-20%',
        width: '20%',
        height: 'auto',
    }
  
}

const mapStateToProps = state => ({
    user: state.user,
    state
  });

class CustomerLandingView extends React.Component{
    constructor(){
        super();
        this.state = {selection: null, path: '/roominput', propertytype: null}
    }

    selectLocationType = (type) => {
        if(type === 'residential'){
            this.setState({selection: true , propertytype: 'residential'});
            this.props.dispatch({type: CUSTOMER_ACTIONS.LOCATION, payload: 1});
        } else {
            this.setState({selection: false, propertytype: 'commercial' });
            this.props.dispatch({type: CUSTOMER_ACTIONS.LOCATION, payload: 2});
        }
    }

    render(){
        const { classes } = this.props;
        let content, layer, locationTypeChoices, locationTypeTitle, locationTypeContent = null;
        let numberofpages = 2;
        // Create layerBackground object to store continuous styles
        let layerBackground = {
            position: 'relative',
            float: 'left',
            width:  '100vw',
            maxHeight: '75vw',
            backgroundPosition: '50% 50%',
            backgroundRepeat:   'no-repeat',
            backgroundSize:     'cover',
            

        }
        // Conditional check to apply either a background color or background image based on state
        if(this.state.propertytype === 'residential'){
            layerBackground.backgroundImage = "url('/Home.jpg')";
        } else if(this.state.propertytype === 'commercial'){
            layerBackground.backgroundImage = "url('/Office.jpg')";
        } else {
            layerBackground.backgroundColor = 'rgba(255, 139, 0, 1)';
        }

        if(this.state.selection === null){
            
            locationTypeContent = (
                <Typography className={classes.locationTypeContent}>
                    Please choose type of your property.
                </Typography>
            );
            locationTypeChoices = (
                <div>
                    <Button onClick={() => this.selectLocationType('residential')} className={classes.unselectedLocationType} value="residential">Residential</Button>
                    <Button onClick={() => this.selectLocationType('commercial')} className={classes.unselectedLocationType} value="commercial">Commercial</Button>
                </div>
            );
        } else if(this.state.selection){
   
            locationTypeContent = (
                
                <Typography className={classes.locationTypeContent}>
                
                     What to expect: You'll fill out our estimator to receive an estimated duration your cleaning will take and then we'll contact you when we've confirmed.
                   <Button className={classes.getStartedButton} onClick={() => this.refs.parallax.scrollTo(2)}>Get Started</Button>
                </Typography>
            );
            locationTypeChoices = (
                <div>
                    <Button onClick={() => this.selectLocationType('residential')} className={classes.selectedLocationType}>Residential</Button>
                    <Button onClick={() => this.selectLocationType('commercial')} className={classes.unselectedLocationType}>Commercial</Button>
                </div>
            );
        } else {
            
            locationTypeContent = (
                <Typography className={classes.locationTypeContent}>
                    What to expect: You'll be navigated to our contact form, and then we will get in touch to discuss the cleaning in further detail.
                    {/* <Link to={this.state.path} className={classes.getStartedLink}> */}
                    <Button className={classes.getStartedButton} onClick={() => this.refs.parallax.scrollTo(2)}>Get Started</Button>
                    {/* </Link> */}
                </Typography>
            );
            locationTypeChoices = (
                <div>
                    <Button onClick={() => this.selectLocationType('residential')} className={classes.unselectedLocationType}>Residential</Button>
                    <Button onClick={() => this.selectLocationType('commercial')} className={classes.selectedLocationType}>Commercial</Button>
                </div>
            );
        }
        switch (this.state.propertytype) {
            case 'commercial':
            
            layer = (
                <Parallax.Layer offset={2} speed={1} style={{ backgroundColor: 'grey' }} />
            );
            numberofpages = 3;
            content = (
                <Parallax.Layer
                    offset={2.2}
                    speed={1}
                    style={styles}>
                    <ContactInfoView histo/>
                </Parallax.Layer>);
        
                break;
                
            case 'residential':
            
            layer = (
                <div>
                <Parallax.Layer offset={2} speed={1} style={{ backgroundColor: 'grey' }} />
                <Parallax.Layer offset={3} speed={1} style={{ backgroundColor: 'grey' }} />
                <Parallax.Layer offset={4} speed={1} style={{ backgroundColor: 'grey' }} />  
                </div>
            );
            numberofpages = 5;
            content = (
                <div>
                <Parallax.Layer
                    offset={2}
                    speed={1}
                    style={styles}>
                    <RoomInputView />
                </Parallax.Layer>

                <Parallax.Layer
                offset={3}
                speed={1}
                style={styles}
                >
                <ApptTimeSelectView />
            </Parallax.Layer>

                <Parallax.Layer
                    offset={4}
                    speed={1}
                    style={styles}
                >
                    <ContactInfoView />
                </Parallax.Layer>
                </div>
            );
				break;
            
                

			default:
				break;
		}
	
      

        return(
            <Parallax ref="parallax" pages={numberofpages}>
                <Parallax.Layer  offset={0} speed={1} style={{backgroundColor: 'white'}} />
                <Parallax.Layer offset={1} speed={1} style={layerBackground} className='fadeIn'/>
                {layer}
                <Parallax.Layer
                    offset={0}
                    speed={5}
                    style={styles}
                    onClick={() => this.refs.parallax.scrollTo(1)}
                >
                    <img src='/giphy.gif' width='100%' className={classes.water}/>
                    <center  className='firstFade' className={classes.logo}>
                        <img src='/LOGO-01.png' width='70%' />
                        <div className='firstButton'>
                            <Button  className={classes.bookNow} onClick={() => this.refs.parallax.scrollTo(1)}>BOOK NOW</Button>
                        </div>
                    </center>
                </Parallax.Layer>
                <Parallax.Layer
                    offset={1}
                    speed={2}
                    // style={{ backgroundImage: '', backgroundSize: 'cover' }}>
                >
                    <center className={classes.center}>
                        <div className={classes.typeOfProperty}>
                            <center>{locationTypeTitle}</center>
                            <center> {locationTypeChoices} </center>
                        </div>
                        <div className={classes.typeOfPropertyContent}>
                            {locationTypeContent}         
                        </div>  
                    </center>    
                </Parallax.Layer>
            {content}
            </Parallax>  
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(CustomerLandingView);

