import React from 'react';
import axios from 'axios';


// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '../../../node_modules/@material-ui/core';
import TextField from '@material-ui/core/TextField';

// Component Imports
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { compose } from 'redux';
import Nav from '../../components/Nav/Nav';


const styles = theme => ({
      button: {
          backgroundColor: '#EF8902',
      },

});

const mapStateToProps = state => ({
  user: state.user,

});

class RequestsView extends React.Component{


    render(){
        let content = null;
        const { classes } = this.props;
    
        if (this.props.user.userName) {
                content = (
                    <div>
                        <div>
                            <Nav />
                        </div>
                        <div>
                            <Typography variant="display4">Request Things on this page</Typography>
                        </div>
                        <div></div>
                    </div>
                );
        }
    
        return(
            <Paper>
                { content }
            </Paper>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(RequestsView);