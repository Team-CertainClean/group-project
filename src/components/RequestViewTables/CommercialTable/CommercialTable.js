import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

// Material UI Imports
import Typography from '@material-ui/core/Typography';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Icon, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';


// Component Imports 
import CommercialTableRow from './CommercialTableRow';

const styles = theme => ({
    button: {
        backgroundColor: '#EF8902',
    },
    title: {
        marginTop: '50px',
    },
    tableCell: {
        padding: 'none',
        width: 'auto',
    },
    tableCard: {
        marginTop: '25px',
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
    requests: state.request,
});

class CommercialTable extends React.Component{
    constructor(){
        super();
        this.state = {
            requests: [],
        };

    };

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.rooms){
            this.setState({rooms: [...nextProps.rooms]});
        }
    }


    // filterRooms = (filter) => {
    //     switch(filter){
    //         case 'Residential':
    //             this.setState({rooms: [...this.props.rooms.filter(room => Number(room.location_type_id) === 1)]});
    //             break;
    //         case 'Commercial':
    //             this.setState({rooms: [...this.props.rooms.filter(room => Number(room.location_type_id) === 2)]});
    //             break;
    //         default:
    //             this.setState({rooms: [...this.props.rooms]});
    //             break;
    //     }
    // }

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

    // alphabeticalSort(){
    //     let roomNames = this.props.rooms.map(room => room.room_name);
    //     let sortedByName = roomNames.sort();
    //     for(let room of this.props.rooms){
    //         let sortedIndex = sortedByName.indexOf(room.room_name);
    //         sortedByName[sortedIndex] = room;
    //     }
    //     console.log('Alphabetical sort: ', sortedByName);
    //     return sortedByName;
    // }

    // reverseAlphabeticalSort(){
    //     let roomNames = this.props.rooms.map(room => room.room_name).sort();
    //     let reverseSortedByName = [];
    //     for(let name of roomNames){
    //         reverseSortedByName.unshift(name);
    //     }
    //     for(let room of this.props.rooms){
    //         let sortedIndex = reverseSortedByName.indexOf(room.room_name);
    //         reverseSortedByName[sortedIndex] = room;
    //     }
    //     return reverseSortedByName;
    // }

    // locationSort(){
    //     let residential = this.props.rooms.filter(room => Number(room.location_type_id) === 1);
    //     let commercial = this.props.rooms.filter(room => Number(room.location_type_id) === 2);
    //     if(this.state.sort){
    //         return [...residential, ...commercial];
    //     } else {
    //         return [...commercial, ...residential];
    //     }
    // }

    // sortRooms = (sort) => {
    //     console.log(sort);
    //     switch(sort){
    //         case 'id':
    //             this.state.sort ? this.setState({rooms: [...this.props.rooms.sort(this.idAscendingSort)], sort: !this.state.sort}) : this.setState({rooms: [...this.props.rooms.sort(this.idDescendingSort)], sort: !this.state.sort});
    //             break;
    //         case 'room_name':
    //             this.state.sort ? this.setState({rooms: [...this.alphabeticalSort()], sort: !this.state.sort}) : this.setState({rooms: [...this.reverseAlphabeticalSort()], sort: !this.state.sort});
    //             break;
    //         case 'location_type_id':
    //             this.state.sort ? this.setState({rooms: [...this.locationSort()], sort: !this.state.sort}) : this.setState({rooms: [...this.locationSort()], sort: !this.state.sort});
    //             break;
    //         default:
    //             this.setState({rooms: [...this.props.rooms]});
    //     }
    // }

    // handleFilter = (event) => {
    //     this.setState({filter: event.target.value});
    //     this.filterRooms(event.target.value);
    // }

    render(){
        console.log("Render Table");
        const { classes } = this.props;
        let table = null;
        console.log(this.state.requests);
        if(this.state.requests){
            table = (
                <div>
                    <div>
                        {/* <Typography variant="display2" className={classes.title}>Commercial Things on this page</Typography> */}
                        <Card>
                            <CardContent>
                                <Table className={classes.table}>
                                    <TableHead className={classes.tableHeader}>
                                        <TableRow>
                                            <TableCell>Request ID<IconButton onClick={() => this.sortRooms('id')}><Icon>sort</Icon></IconButton></TableCell>
                                            <TableCell>Customer Name</TableCell>
                                            <TableCell>Customer Email</TableCell>
                                            <TableCell>Cleaning Type</TableCell>
                                            <TableCell>Room</TableCell>
                                            <TableCell>Requested Time</TableCell>
                                            <TableCell>Status<IconButton onClick={() => this.sortRooms('id')}><Icon>sort</Icon></IconButton></TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.commercial.map((request, i) => {
                                            return(
                                                <CommercialTableRow key={i} rowData={request} />
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                    <div></div>
                </div>
            )
        }
        return(
            <div>
                <Typography variant="title">Commercial</Typography>
                <Card className={classes.tableCard}>
                    <CardContent>
                        {table}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(CommercialTable);