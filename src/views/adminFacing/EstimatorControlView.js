import React from 'react';

// Component Imports
import MenuBar from '../../components/MenuBar/MenuBar';

class EstimatorControlView extends React.Component{
    constructor(){
        super();
        this.state = {selectedTable: 0};
    }

    selectOption = (index) => {
        this.setState({selectedTable: index});
    }
    render(){
        const {classes} = this.props;

        let table = null;
        if(this.state.selectedTable === 1) {
            // table = <LocationControlTable />
        } 
        else if(this.selectedTable === 2) {
            // table = <CleanerControlTable />
        } 
        else if(this.selectedTable === 0) {
            // table = <RoomControlTable />
        }

        const menuOptions=["Rooms", "Locations", "Cleaners"];
        return(
            <div>
                <MenuBar menuOptions={menuOptions} selectOption={this.selectOption}/>
                {table}
            </div>
        );
    }
}

export default EstimatorControlView;