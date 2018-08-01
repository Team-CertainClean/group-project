import React from 'react';

// Material UI Imports
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class LocationSelectionMenu extends React.Component{
    constructor(){
        super();
        this.state = {anchor: null};
    }

    closeMenu = () => {
        this.setState({anchor: null});
    }

    openMenu = (event) => {
        this.setState({anchor: event.currentTarget});
    }

    render(){
        const {anchor} = this.state;
        return(
            <div>
                <Button onClick={this.openMenu}>Location Type</Button>
                <Menu
                    id="location-menu"
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    onClose={this.closeMenu}
                >
                    {/* {this.props.locations.map(location => {
                        <MenuItem 
                        onClick={()=> {
                            this.props.handleInputChange('location_id');
                            this.closeMenu();
                        }}
                        value={location.id}
                        >
                            {location.location_name}
                        </MenuItem>
                    })} */}
                    <MenuItem>TEST: Residential</MenuItem>
                    <MenuItem>TEST: Commercial</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default LocationSelectionMenu;