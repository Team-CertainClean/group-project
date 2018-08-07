import React from 'react';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '../../../node_modules/@material-ui/core';

// Component Imports
import { Link } from 'react-router-dom';

//Parallax
import { Parallax, ParallaxLayer } from 'react-spring'

const styles = {
    fontFamily: 'Menlo-Regular, Menlo, monospace',
    fontSize: 14,
    lineHeight: '10px',
    color: 'white',
    alignItems: 'center', 
    justifyContent: 'center',
    bookNow:{
        padding: '1%',
        borderRadius: '60px',
        display: 'flex', 
        color: 'white',
        backgroundColor: '#ef8902',
        '&:hover':{
            color: '#ef8902',
            backgroundColor: 'white',
            borderRadius: '60px',

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
        borderRadius: '60px',
        display: 'flex', 
        fontSize: 48,
        backgroundColor: '#ef8902'
    },
    getStartedLink: {
        textDecorationLine: 'none'
    },
    typeOfProperty: {
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
        overflow:'hidden',
        width: '100%',
        height: '80%',
    },
    locationTypeContent: {
        fontSize: 25,
        color: 'white !important',
    }
  
}



class CustomerLandingView extends React.Component{
    constructor(){
        super();
        this.state = {selection: null, path: '/addroom'}
    }

    selectLocationType = (type) => {
        if(this.state.selection === null){
            if(type === "residential"){
                this.setState({selection: true, path: '/addroom'});
            } else {
                this.setState({selection: false, path: '/contact'});
            }
        } else {
            if(type === "residential"){
                this.setState({selection: true, path: '/addroom'});
            } else {
                this.setState({selection: false, path: '/contact'});
            }
        }
    }

    render(){

        const { classes } = this.props;

        let locationTypeChoices = null;
        let locationTypeTitle = null;
        let locationTypeContent = null;
        if(this.state.selection === null){
            locationTypeTitle = (
                <Typography variant="title">Choose a location type</Typography>
            );
            locationTypeContent = (
                <Typography className={classes.locationTypeContent}>
                    Choose Residential or Commercial
                </Typography>
            );
            locationTypeChoices = (
                <div>
                    <Button onClick={() => this.selectLocationType('residential')} className={classes.unselectedLocationType} value="residential">Residential</Button>
                    <Button onClick={() => this.selectLocationType('commercial')} className={classes.unselectedLocationType} value="commercial">Commercial</Button>
                </div>
            );
        } else if(this.state.selection){
            locationTypeTitle = (
                <Typography variant="title">Residential</Typography>
            );
            locationTypeContent = (
                <Typography className={classes.locationTypeContent}>
                    What to expect: You'll fill out our estimator to receive an estimated duration your cleaning will take and then we'll contact you when we've confirmed.
                </Typography>
            );
            locationTypeChoices = (
                <div>
                    <Button onClick={() => this.selectLocationType('residential')} className={classes.selectedLocationType}>Residential</Button>
                    <Button onClick={() => this.selectLocationType('commercial')} className={classes.unselectedLocationType}>Commercial</Button>
                </div>
            );
        } else {
            locationTypeTitle = (
                <Typography variant="title">Commercial</Typography>
            );
            locationTypeContent = (
                <Typography className={classes.locationTypeContent}>
                    What to expect: You'll be navigated to our contact form, and then we will get in touch to discuss the cleaning in further detail.
                </Typography>
            );
            locationTypeChoices = (
                <div>
                    <Button onClick={() => this.selectLocationType('residential')} className={classes.unselectedLocationType}>Residential</Button>
                    <Button onClick={() => this.selectLocationType('commercial')} className={classes.selectedLocationType}>Commercial</Button>
                </div>
            );
        }

        return(
            <Parallax ref="parallax" pages={3}>

            <Parallax.Layer offset={0} speed={1} style={{ backgroundColor: 'white' }} />
            <Parallax.Layer offset={1} speed={1} style={{  backgroundColor: '#EF8901'}} />
            <Parallax.Layer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />
            

        
            <Parallax.Layer
                offset={0}
                speed={5}
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(1)}>
                <center  className='firstFade'>
                <img src='/LOGO-01.png' width='80%'></img>
                <div className='firstButton'>
                <Button  className={classes.bookNow} onClick={() => this.refs.parallax.scrollTo(1)}>BOOK NOW</Button>
                </div>
                </center>
           
            </Parallax.Layer>

            <Parallax.Layer
                offset={1}
                speed={2}
                style={styles}>
                <center className={classes.center}>
                <div className={classes.typeOfProperty}>
                       <center> {locationTypeChoices} </center>
                </div>
                
                <div className={classes.typeOfPropertyContent}>
                                {locationTypeContent}
                                <Link to={this.state.path} className={classes.getStartedLink}><Button className={classes.getStartedButton}>Get Started</Button></Link>
                </div>
                      
                </center>
                    
            </Parallax.Layer>

            <Parallax.Layer
                offset={2}
                speed={2}
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(0)}>
                
            </Parallax.Layer>

        </Parallax>
            
        );
    }
}

export default withStyles(styles)(CustomerLandingView);