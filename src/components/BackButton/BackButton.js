import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
    backButton: {
        marginTop: '1vw',
    margin: '1vw',
    padding: '1%',
    paddingLeft: '2%',
    paddingRight: '2%',
		borderRadius: '100px',
        fontSize: '2vw',
        color: 'white',
        border: '0.2vw solid white' ,
        '&:hover': {
            border: '0.2vw solid rgba(255,255,255,0.5)'

		}
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