import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    backButton: {
        borderRadius: '100px',
        display: 'flex', 
        backgroundColor: 'grey',
        marginTop: '5%',
        padding: '2.5%',
        paddingLeft: '4%',
        paddingRight: '4%',
        fontSize: 48,
        color: 'white !important'
    }
}

const BackButton = (props) => {
    const { classes, scroll, offset } = props;
    return (
        <Button className={classes.backButton} onClick={() => scroll(offset)}>Back</Button>
    );
}

BackButton.propTypes = {
    scroll: PropTypes.func.isRequired,
    offset: PropTypes.number.isRequired
}

export default withStyles(styles)(BackButton);