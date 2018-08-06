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
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',

    selectedLocationType: {
        display: 'flex', 
        color: 'white',
        backgroundColor: '#ef8902',
        '&:hover':{
            backgroundColor: '#ef8902'
        }
    },
    unselectedLocationType: {
        backgroundColo: 'grey'
    },
    getStartedButton: {
        display: 'flex', 
        backgroundColor: '#ef8902'
    },
    getStartedLink: {
        textDecorationLine: 'none'
    },
    locationTypeChoices: {
        color: 'pink'
    }
}



class CustomerLandingView extends React.Component{
    constructor(){
        super();
        this.state = {selection: null, path: '/roominput'}
    }

    selectLocationType = (type) => {
        if(this.state.selection === null){
            if(type === "residential"){
                this.setState({selection: true, path: '/roominput'});
            } else {
                this.setState({selection: false, path: '/contact'});
            }
        } else {
            if(type === "residential"){
                this.setState({selection: true, path: '/roominput'});
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
                <Typography>
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
                <Typography>
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
                <Typography>
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
                <img src='/LOGO-01.png' width='1000px'></img>
                <div className='firstButton'>
                <Button  className={classes.selectedLocationType} onClick={() => this.refs.parallax.scrollTo(0)}>BOOK NOW</Button>
                </div>
                </center>
           
            </Parallax.Layer>

            <Parallax.Layer
                offset={1}
                speed={-0.1}
                style={styles}>
                <div className='choises'>
                        {locationTypeChoices}
                </div>
                
                            
                                {locationTypeTitle}
                                {locationTypeContent}
                           
                        <Link to={this.state.path} className={classes.getStartedLink}><Button className={classes.getStartedButton}>Get Started</Button></Link>
                
                    
            </Parallax.Layer>

            <Parallax.Layer
                offset={2}
                speed={0.5}
                style={styles}
                onClick={() => this.refs.parallax.scrollTo(0)}>
                
            </Parallax.Layer>

        </Parallax>
            
        );
    }
}

export default withStyles(styles)(CustomerLandingView);