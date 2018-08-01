import React from 'react';

// Component Imports
import MenuBar from '../../components/MenuBar/MenuBar';
import RoomControlTable from '../../components/EstimatorControlTables/RoomsTable/RoomsTable';

class EstimatorControlView extends React.Component{
    constructor(){
        super();
        this.state = {selectedTable: 0};
    }

    selectOption = (index) => {
        this.setState({selectedTable: index});
    }
    render(){
        // const {classes} = this.props;

        let table = null;
        if(this.state.selectedTable == 1) {
            // table = <LocationControlTable />
        } 
        else if(this.state.selectedTable == 2) {
            // table = <CleanerControlTable />
        } 
        else if(this.state.selectedTable == 0){
            table = <RoomControlTable />;
        }

        const menuOptions=["Rooms", "Locations", "Cleaners"];
        return(
            <div>
                <MenuBar menuOptions={menuOptions} selectOption={this.selectOption} />
                <div>
                    {table}
                </div>
            </div>
        );
    }
}

export default EstimatorControlView;