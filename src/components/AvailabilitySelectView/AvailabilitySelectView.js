import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ContactInfo from './contactInfo';
import RoomInfo from './roomInfo';
import TimeAndInfo from './timeAndFinish';
import Calendar from './calendar';

const mapStateToProps = state => ({
    user: state.user,
});

class AvailabilitySelectView extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    render() {
        return (
            <div>
                <ContactInfo />
                <RoomInfo />
                <TimeAndInfo />
                <Calendar />
            </div>
        );
    }
}
  
export default connect(mapStateToProps)(AvailabilitySelectView);