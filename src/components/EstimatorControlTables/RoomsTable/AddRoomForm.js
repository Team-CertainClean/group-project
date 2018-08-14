import React from 'react';

// Component Imports
import LocationSelectionMenu from './LocationSelectionMenu';

// Material UI Imports
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { EstimatorControlStyles } from '../styles';
import Button from '@material-ui/core/Button';

// const styles = {
//     formblock: {
//        backgroundColor: 'lightgrey',
//        borderRadius: '10vw',
//        padding: '1vw',
//        paddingBottom: '2vw'
//     },
//     submitButton: {
     
//         backgroundSize: '200% auto',
//         transition: '0.5s',
//         backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%, #fe981e 100%)',
//         borderRadius: '200px',
//         display: 'flex',
//         backgroundColor: '#ef8902',
//         // marginTop: '3vw',
//         margin: '1vw',
//         // padding: '2%',
//         // paddingLeft: '4%',
//         // paddingRight: '4%',
//         fontSize: '2vw',
//         color: 'white !important',
//         '&:hover': {
//           backgroundImage: 'linear-gradient(to right, #ff8008 0%, #ffc837 51%,#fbad40 100%)',
//           backgroundColor: '#E8E8E8',
//           backgroundPosition: 'right center'
//         }
//       },
// }

class AddRoomForm extends React.Component{

    render(){
        const { classes } = this.props;
        let form = null;
        
            form = (
                <div>
                <div className={classes.formblock}>
                <TextField
                    id="room_name"
                    label="Room Name"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.room}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_one"
                    label="Dirtiest Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.one}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_two"
                    label="Dirty Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.two}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_three"
                    label="Normal Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.three}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_four"
                    label="Clean Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.four}
                    onChange={this.props.handleChangeFor}
                />
                <TextField
                    id="cleanliness_metric_five"
                    label="Cleanest Metric"
                    type="number"
                    // className={classes.textField}
                    margin="normal"
                    value={this.props.metrics.five}
                    onChange={this.props.handleChangeFor}
                />
                <LocationSelectionMenu locations={this.props.locations} handleLocationSelect={this.props.handleLocationSelect} anchor={this.props.anchor} />
                </div>
                <center>
                <Button onClick={this.props.submitRoom} className={classes.submitButton}>Add Room</Button>
                </center>
                </div>
            );
        
        return(
            <div>
                {form}
            </div>
        );
    }
}

export default withStyles(EstimatorControlStyles)(AddRoomForm);