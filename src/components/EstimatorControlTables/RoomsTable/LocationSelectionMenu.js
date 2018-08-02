import React from 'react';

// Material UI Imports
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class LocationSelectionMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {anchor: this.props.anchor};
    }

    openMenu = (event) => {
        this.setState({anchor: event.currentTarget});
    }

    closeMenu = () => {
        this.setState({anchor: null});
    }

    handleMenuSelect = async (event) => {
        console.log("before await");
        await this.props.handleChangeFor(event);
        console.log("after await");
        this.closeMenu();
    }

    render(){
        const {anchor} = this.state;
        return(
            <div style={{display: 'inline'}}>
                <Button onClick={this.openMenu}>Location Type</Button>
                <Menu
                    id="location-menu"
                    anchorEl={anchor}
                    open={Boolean(anchor)}
                    onClose={this.closeMenu}
                >
                    {this.props.locations.map(location => {
                        return <MenuItem 
                                    key={location.id}
                                    id="location_type_id"
                                    value={location.id}
                                    onClick={this.handleMenuSelect}
                                    >
                                        {location.location_type}
                                </MenuItem>
                    })}
                </Menu>
            </div>
        );
    }
}

export default LocationSelectionMenu;