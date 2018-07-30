import React from 'react';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../styles/LandingViewStyles';

// Component Imports

class CustomerLandingView extends React.Component{
    constructor(){
        super();
        this.state = {selection: null}
    }

    selectLocationType = (event) => {
        if(this.state.selection === null){
            if(event.target.value === "Residential"){
                this.setState({selection: false});
            } else {
                this.setState({selection: true});
            }
        } else {
            this.setState({selection: !this.state.selection});
        }
    }

    render(){

        const { classes } = this.props;
        let locationTypeChoices = null;
        if(this.state.selection === null){
            locationTypeChoices = (
                <div>
                    <Button onClick={this.selectLocationType} className={classes.unselectedLocationType}>Residential</Button>
                    <Button onClick={this.selectLocationType} className={classes.unselectedLocationType}>Commercial</Button>
                </div>
            );
        } else if(this.state.selection){
            locationTypeChoices = (
                <div>
                    <Button onClick={this.selectLocationType} className={classes.selectedLocationType}>Residential</Button>
                    <Button onClick={this.selectLocationType} className={classes.unselectedLocationType}>Commercial</Button>
                </div>
            );
        } else {
            locationTypeChoices = (
                <div>
                    <Button onClick={this.selectLocationType} className={classes.unselectedLocationType}>Residential</Button>
                    <Button onClick={this.selectLocationType} className={classes.selectedLocationType}>Commercial</Button>
                </div>
            );
        }

        return(
            <Paper>
                {locationTypeChoices}
                <Card>
                    <CardHeader>

                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
            </Paper>
        );
    }
}

export default withStyles(styles)(CustomerLandingView);