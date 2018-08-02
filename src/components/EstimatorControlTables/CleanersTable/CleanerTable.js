import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { CLEANER_ACTIONS } from '../../../redux/actions/cleanerActions';

// Material UI Imports
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

// Component Imports 
import AddCleanerForm from './AddCleanerForm';

const mapStateToProps = store => ({
    cleaners: store.cleaners
});

class CleanerControlTable extends React.Component{
    constructor(){
        super();
        this.state = {
            cleanerInfo: {
                first_name: '',
                last_name: '',
                properly_account_id: 0
            }
        }
    }

    componentDidMount(){
        this.props.dispatch({type: CLEANER_ACTIONS.FETCH});
    }

    submitCleaner = () => {
        this.props.dispatch({type: CLEANER_ACTIONS.POST, payload: this.state.cleanerInfo});
        console.log('SEND IT: ', this.state.cleanerInfo);
    }

    removeCleaner = (id) => {
        this.props.dispatch({type: CLEANER_ACTIONS.REMOVE, payload: id});
    }

    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{
                this.setState({cleanerInfo: {...this.state.cleanerInfo, [event.target.id]: event.target.value}});
                resolve();
            }catch(error){
                reject();
            }
        });
    }

    render(){
        let table = null;
        if(this.props.cleaners){
            table = (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Properly Account ID</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Remove</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.cleaners.map(cleaner => {
                            return(
                                <TableRow key={cleaner.id}>
                                    <TableCell>{cleaner.id}</TableCell>
                                    <TableCell>{cleaner.first_name + ' ' + cleaner.last_name}</TableCell>
                                    <TableCell>{cleaner.properly_account_id}</TableCell>
                                    <TableCell><IconButton><Icon>edit</Icon></IconButton></TableCell>
                                    <TableCell><IconButton onClick={() => {this.removeCleaner(cleaner.id)}}><Icon>delete_outline</Icon></IconButton></TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }
        return(
            <Paper>
                <Typography variant="title">Add Cleaners</Typography>
                <AddCleanerForm handleChangeFor={this.handleChangeFor} submitCleaner={this.submitCleaner} first_name={this.state.cleanerInfo.first_name} last_name={this.state.cleanerInfo.last_name} properly_account_id={this.state.cleanerInfo.properly_account_id} />
                {table}
            </Paper>
        );
    }
}

export default compose(
    connect(mapStateToProps)
)(CleanerControlTable);