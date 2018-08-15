import React from 'react';
import {connect} from 'react-redux';

// Component Imports
import MenuBar from '../../components/MenuBar/MenuBar';
import RoomControlTable from '../../components/EstimatorControlTables/RoomsTable/RoomsTable';
import CleanerControlTable from '../../components/EstimatorControlTables/CleanersTable/CleanerTable';
import LocationControlTable from '../../components/EstimatorControlTables/LocationsTable/LocationsTable';
import CleaningTypeTable from '../../components/EstimatorControlTables/CleaningTypeTable/CleaningTypeTable';
import Nav from '../../components/Nav/Nav';

const mapStateToProps = state => ({
    user: state.user,
  });
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
        let menuBar = null;
        let table = null;
        let nav = null;

        
        // This function provides auth for admin profiles
        if (this.props.user.userName) {

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
            menuBar = ( <MenuBar menuOptions={menuOptions} selectOption={this.selectOption} /> );
            nav = ( <Nav history={this.props.history} /> )
        }

        return(
            <div style={{'width': '100vw','position': 'absolute','paddingBottom':'20vh', height: '100vh',
            background: 'linear-gradient(to bottom, white 0%,  lightgrey 100%)',}}>
                {/* <Nav history={this.props.history}/> */}
                { nav }
                <center>
                    { menuBar }
                {/* <MenuBar menuOptions={menuOptions} selectOption={this.selectOption} /> */}
                </center>
                <div>
                    { table }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(EstimatorControlView);