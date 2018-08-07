import React from 'react';

// Material UI Imports
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import RequestMenuBarStyles from './RequestMenuBarStyles';

class RequestMenuBar extends React.Component{
    render(){
        const {classes} = this.props;
        return(
            <Paper className={classes.bar}>
                <MenuList className={classes.list}>
                    {this.props.menuOptions.map((option, i) => {
                        return (
                                <MenuItem key={i} onClick={() => this.props.selectOption(i)} className={classes.listOption}>
                                    <Typography>{option}</Typography>
                                </MenuItem>
                                );
                            }
                        )
                    }
                </MenuList>
            </Paper>
        );
    }
}

export default withStyles(RequestMenuBarStyles)(RequestMenuBar);