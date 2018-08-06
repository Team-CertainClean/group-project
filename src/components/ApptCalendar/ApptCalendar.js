import Calendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(Calendar);

const mapStateToProps = state => ({
    user: state.user,
});

class ApptCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {    
                start: null,
                end: null,
                },
            ],
        }
    } 

    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    moveEvent = ({ event, start, end }) => {
        const { events } = this.state;
        console.log('in moveevent');
        const idx = events.indexOf(event);
        console.log('idx:', idx);
        // let allDay = event.allDay
    
        // if (!event.allDay && droppedOnAllDaySlot) {
        //   allDay = true
        // } else if (event.allDay && !droppedOnAllDaySlot) {
        //   allDay = false
        // }
    
        const updatedEvent = { ...event, start, end}
    
        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)
    
        this.setState({
          events: nextEvents,
        })
        console.log('this.state=', this.state)
        alert(`the event was dropped onto ${updatedEvent.start}`)
    }

    // resizeEvent = ({ event, start, end }) => {
    //     console.log('in resizeEvent');
    //     const { events } = this.state;
    //     const idz = events.indexOf(event);
    //     console.log(idz);
    //     const nextEvents = events.map((existingEvent, i) => {
    //       return (i === idz)
    //         ? { ...existingEvent, start, end }
    //         : existingEvent
    //     })
    
    //     this.setState({
    //       events: nextEvents,
    //     })
    //     //alert(`${event.title} was resized to ${start}-${end}`)
    // }

    onSelect = (slotInfo) => {
        console.log('slotInfo:', slotInfo);
        this.setState({
            events: [...this.state.events, {start: new Date(slotInfo.start), end: new Date(slotInfo.end)}],
        });
        console.log('this.state=', this.state);
        this.dispatchAppt();
        return true;
    }

    dispatchAppt() {
        this.props.dispatch({ type: CUSTOMER_ACTIONS.APPT, payload: this.state.events });
    }

    render() {
        // const { classes } = this.props;
        return (
            <div>
                <DragAndDropCalendar 
                // className={classes.calendar}
                defaultDate={new Date()}
                defaultView={Calendar.Views.WEEK}
                views={{
                    week: true,
                }}
                events={this.state.events}
                onEventResize={this.resizeEvent}
                onEventDrop={this.moveEvent}
                selectable
                resizable
                step={30}
                min={new Date(2018, 7, 2, 5)}
                max={new Date(2018, 7, 2, 20)}
                onSelectSlot={this.onSelect}
                />
            </div>
        );
    }
}

// ApptCalendar.propTypes = {
//     classes: PropTypes.object.isRequired,
// };
  

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(ApptCalendar));