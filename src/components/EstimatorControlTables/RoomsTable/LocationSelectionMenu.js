import React from 'react';

// Material UI Imports
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class LocationSelectionMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {location: null};
    }

    openMenu = (event) => {
        this.setState({anchor: event.currentTarget});
    }

    closeMenu = () => {
        this.setState({anchor: null});
    }


    handleSelect = (event) => {
        this.setState({location: event.target.value.location_type});
        this.props.handleLocationSelect(event.target.value.id);
    }

    render(){
        return(
            <div style={{display: 'inline', margin: 0}}>
                {/* <Button onClick={this.openMenu} style={{width: 50, height: 50}}>Location Type</Button> */}
                <Select
                    id="location-menu"
                    value={this.state.location ? this.state.location : "Location Type"}
                    onChange={this.handleSelect}
                    style={{width: '8vw'}}
                >
                    <MenuItem value={this.state.location ? this.state.location :  "Location Type"} disabled>
                        {this.state.location? this.state.location :  "Location Type"}
                    </MenuItem>
                    {this.props.locations.map(location => {
                        return <MenuItem 
                                    key={location.id}
                                    id="location_type_id"
                                    value={location}
                                    // onClick={this.handleMenuSelect}
                                    style={{width: '100%'}}
                                    >
                                        {location.location_type}
                                </MenuItem>
                    })}
                </Select>
            </div>
        );
    }
}

export default LocationSelectionMenu;