import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { CLEANING_TYPE_ACTIONS } from '../../../redux/actions/cleaningTypeActions';

// Material UI Imports
import{ Typography,
        Table,
        TableHead,
        TableBody,
        TableRow,
        TableCell,
        Card,
        CardContent } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {EstimatorControlStyles} from '../styles';

// Component Imports 
import EditableTableRow from '../../EditableTableRow/EditableTableRow';
import CleaningTypeForm from './CleaningTypeForm';


const mapStateToProps = state => ({
    cleaningTypes: state.cleaningTypes,
});

class CleaningTypeTable extends React.Component{
    constructor(){
        super();
        this.state = {
            cleaning_type: {
                cleaning_type: ''
            },
        }
    }

    componentDidMount(){
        this.props.dispatch({type: CLEANING_TYPE_ACTIONS.FETCH});
    }

    submitCleaningType = () => {
        this.props.dispatch({type: CLEANING_TYPE_ACTIONS.POST, payload: this.state.cleaning_type});
        this.clearInputs();
    }

    handleChangeFor = event => {
        return new Promise((resolve, reject)=>{
            try{
                this.setState({cleaning_type: {...this.state.cleaning_type, [event.target.id]: event.target.value}});
                console.log(`this.state.cleaning_type`, this.state.cleaning_type)
                resolve();
            }catch(error){
                reject();
            }
        });
    }

    removeCleaningType = (id) => {
        console.log(`removeCleaningType id`, id)
        this.props.dispatch({type: CLEANING_TYPE_ACTIONS.REMOVE, payload: id});
    }

    clearInputs = () => {
        this.setState({cleaning_type: {cleaning_type:''}});
    }

    render(){
        const {classes} = this.props;
        let table = null;
        if(this.props.cleaningTypes){
            table = (
                <Table className={classes.table}>
                    <TableHead className={classes.tableHeader}>
                        <TableRow>
                            <TableCell>Cleaning Type ID</TableCell>
                            <TableCell>Cleaning Type</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Hide</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.cleaningTypes.map(type => {
                            return(
                                <EditableTableRow rowData={type} actions={CLEANING_TYPE_ACTIONS} remove={this.removeCleaningType}/>
                            );
                        })}
                    </TableBody>
                </Table>
            );
        }
        return(
            <div className={classes.estimatorControlComponent}>
                <Typography style={{marginBottom: 10}} variant="title">Add Cleaning Type</Typography>
                <CleaningTypeForm handleChangeFor={this.handleChangeFor} submitCleaningType={this.submitCleaningType} cleaning_type={this.state.cleaning_type.cleaning_type} />
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
    withStyles(EstimatorControlStyles)
)(CleaningTypeTable);