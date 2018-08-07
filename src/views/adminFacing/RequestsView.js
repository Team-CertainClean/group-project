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
import MenuBar from '../../components/MenuBar/MenuBar';


const styles = theme => ({
      button: {
          backgroundColor: '#EF8902',
      },
      title: {
          marginTop: '50px',

      },
      tableCard: {
        width: '90%',
        margin: 'auto',
        marginTop: 25
    },
    estimatorControlComponent: {
        textAlign: 'center',
        padding: 15,
        paddingBottom: 0
    },
    tableHeader: {
        backgroundColor: 'rgba(77, 71, 66)',
        '& *': {
            color: 'white'
        }
    },
    row: {
        '&:nth-of-type(even)': {
            backgroundColor: 'rgba(160, 156, 153)'
        },
        '&:nth-of-type(odd)': {
            backgroundColor: 'rgba(255, 255, 255, 1)'
        }
    }
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
            // residential: [],
            // commercial: [],
            sort: false,
            selectedTable: 0
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: REQUEST_ACTIONS.FETCH });
    }
    
    // idAscendingSort(a, b){
    //     console.log('Ascending');
    //     console.log('A: ', a);
    //     console.log('B: ', b);
    //     return Number(a.id) - Number(b.id);
    // }

    // idDescendingSort(a, b){
    //     console.log('Descending');
    //     return Number(b.id) - Number(a.id);
    // }

    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps);
    //     if(nextProps.request){
    //         this.setState({requests: [...nextProps.request]});
    //     }
    // }

    // alphabeticalSort(){
    //     let requestNames = this.props.requests.map(request => request.room_name);
    //     let sortedByName = requestNames.sort();
    //     for(let room of this.props.requests){
    //         let sortedIndex = sortedByName.indexOf(room.room_name);
    //         sortedByName[sortedIndex] = room;
    //     }
    //     console.log('Alphabetical sort: ', sortedByName);
    //     return sortedByName;
    // }

    // reverseAlphabeticalSort(){
    //     let requestNames = this.props.requests.map(room => room.room_name).sort();
    //     let reverseSortedByName = [];
    //     for(let name of requestNames){
    //         reverseSortedByName.unshift(name);
    //     }
    //     for(let room of this.props.rooms){
    //         let sortedIndex = reverseSortedByName.indexOf(room.room_name);
    //         reverseSortedByName[sortedIndex] = room;
    //     }
    //     return reverseSortedByName;
    // }

    // sortRooms = (sort) => {
    //     console.log(sort);
    //     switch(sort){
    //         case 'id':
    //             console.log(this.state);
    //             this.state.sort ? this.setState({requests: [...this.props.request.sort(this.idAscendingSort)], sort: !this.state.sort}) : this.setState({rooms: [...this.props.request.sort(this.idDescendingSort)], sort: !this.state.sort});
    //             break;
    //         // case 'name':
    //         //     this.state.sort ? this.setState({requests: [...this.alphabeticalSort()], sort: !this.state.sort}) : this.setState({requests: [...this.reverseAlphabeticalSort()], sort: !this.state.sort});
    //         //     break;
    //         // case 'email':
    //         //     this.state.sort ? this.setState({requests: [...this.alphabeticalSort()], sort: !this.state.sort}) : this.setState({requests: [...this.reverseAlphabeticalSort()], sort: !this.state.sort});
    //         //     break;
    //         case 'serviceType':
    //             this.state.sort ? this.setState({requests: [...this.alphabeticalSort()], sort: !this.state.sort}) : this.setState({requests: [...this.reverseAlphabeticalSort()], sort: !this.state.sort});
    //             break;
    //         case 'status':
    //             this.state.sort ? this.setState({requests: [...this.alphabeticalSort()], sort: !this.state.sort}) : this.setState({requests: [...this.reverseAlphabeticalSort()], sort: !this.state.sort});
    //             break;
    //         default:
    //             this.setState({requests: [...this.props.rooms]});
    //     }
    // }


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
                <MenuBar menuOptions={menuOptions} selectOption={this.selectOption} />
            )

            let residential = this.props.requests.filter(request => request.request_info.location_type === 1)
            let commercial = this.props.requests.filter(request => request.request_info.location_type === 2)

            // determine which table to render based on menuBar click
            if(this.state.selectedTable == 0) {
                table = <ResidentialTable residential={ residential }/>
            } 
            else if(this.state.selectedTable == 1) {
                table = <CommercialTable commercial={ commercial } />
            }
        }
    
        return(
            <div style={{'width': '100vw', 'position': 'relative', 'left': -8}}>
                <Nav history={this.props.history} />
                <div>
                    { menuBar }
                </div>
                <br />
                <div>
                    { table }
                </div>
            </div>
        );
    }
}

export default compose(withStyles(styles), connect(mapStateToProps))(RequestsView);