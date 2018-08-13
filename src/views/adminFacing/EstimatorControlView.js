import React from 'react';

// Component Imports
import MenuBar from '../../components/MenuBar/MenuBar';
import RoomControlTable from '../../components/EstimatorControlTables/RoomsTable/RoomsTable';
import CleanerControlTable from '../../components/EstimatorControlTables/CleanersTable/CleanerTable';
import LocationControlTable from '../../components/EstimatorControlTables/LocationsTable/LocationsTable';
import CleaningTypeTable from '../../components/EstimatorControlTables/CleaningTypeTable/CleaningTypeTable';
import Nav from '../../components/Nav/Nav';

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
            table = <LocationControlTable />
        } 
        else if(this.state.selectedTable == 2) {
            table = <CleanerControlTable />
        } 
        else if(this.state.selectedTable == 0){
            table = <RoomControlTable />
        }
        else if(this.state.selectedTable == 3){
            table = <CleaningTypeTable />;
        }

        const menuOptions=["Rooms", "Locations", "Cleaners", "Cleaning Type"];
        return(
            <div style={{'width': '100vw', 'position': 'relative', 'left': -8}}>
                <Nav history={this.props.history}/>
                <MenuBar menuOptions={menuOptions} selectOption={this.selectOption} />
                <br/><br/><br/>
                <div>
                    {table}
                </div>
            </div>
        );
    }
}

export default EstimatorControlView;