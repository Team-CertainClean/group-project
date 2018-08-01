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
                    <MenuItem 
                    value={1}  
                    id="location_id"
                    onClick={this.props.handleChangeFor}
                    onClick={this.closeMenu}
                    >
                        TEST: Residential
                    </MenuItem>
                    <MenuItem 
                    value={2}
                    id="location_id"
                    onClick={this.props.handleChangeFor}
                    onClick={this.closeMenu}
                    >
                        TEST: Commercial
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default LocationSelectionMenu;