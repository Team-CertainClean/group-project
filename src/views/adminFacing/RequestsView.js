import React from 'react';

// Material UI Imports
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { Typography } from '../../../node_modules/@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


// Component Imports
import {connect} from 'react-redux';
import { compose } from 'redux';
import Nav from '../../components/Nav/Nav';
import { REQUEST_ACTIONS } from '../../redux/actions/requestActions';
// import ResidentialTableRow from '../../components/ResidentialTableRow/ResidentialTableRow';
// import CommercialTableRow from '../../components/CommercialTableRow/CommercialTableRow';
import CommercialTable from '../../components/RequestViewTables/CommercialTable/CommercialTable';
import ResidentialTable from '../../components/RequestViewTables/ResidentialTable/ResidentialTable';
import RequestMenuBar from '../../components/RequestMenuBar/RequestMenuBar';


const styles = theme => ({

});

const mapStateToProps = state => ({
  user: state.user,
  requests: state.request,

});

class RequestsView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filter: '',
            requests: [],
            sort: false,
            selectedTable: 0
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: REQUEST_ACTIONS.FETCH });
    }

    selectOption = (index) => {
        this.setState({selectedTable: index});
    }

    render(){
        let menuBar = null;
        let table = null;
        const menuOptions=["Residential", "Commercial"];
        const { classes } = this.props;
        
        if (this.props.user.userName) {
            menuBar = (
                <RequestMenuBar menuOptions={menuOptions} selectOption={this.selectOption} />
            )
            console.log(`this is this.props.requests in RequestsView`, this.props.requests)
            let residential = this.props.requests.filter(request => request.request_info.location_type === 1)
            let commercial = this.props.requests.filter(request => request.request_info.location_type === 2)

            // determine which table to render based on menuBar click
            if(this.state.selectedTable == 0) {
                table = <ResidentialTable residential={ residential } />
            } 
            else if(this.state.selectedTable == 1) {
                table = <CommercialTable commercial={ commercial } />
            }
        }
    
        return(
            <div style={{'width': '100vw', 'position': 'relative', 'left': -8}}>
                <Nav history={this.props.history} />
                { menuBar }
                <br />
                { table }

            </div>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(RequestsView);