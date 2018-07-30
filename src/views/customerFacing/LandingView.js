import React from 'react';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../styles/LandingViewStyles';
import { Typography } from '../../../node_modules/@material-ui/core';

// Component Imports
import { Link } from 'react-router-dom';

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
                <Typography>
                    Choose Residential for cleaning a home, or an airbnb.
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
            <Paper>
                {locationTypeChoices}
                <Card>
                    <CardContent>
                        {locationTypeTitle}
                        {locationTypeContent}
                    </CardContent>
                </Card>
                <Link to={this.state.path} className={classes.getStartedLink}><Button className={classes.getStartedButton}>Get Started</Button></Link>
            </Paper>
        );
    }
}

export default withStyles(styles)(CustomerLandingView);