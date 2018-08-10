import Calendar from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';
import { AVAILABILITY_ACTIONS } from '../../redux/actions/availabilityActions';
import { CUSTOMER_ACTIONS } from '../../redux/actions/customerActions';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));
const DragAndDropCalendar = withDragAndDrop(Calendar);

const mapStateToProps = state => ({
    availabilityEvents: state.availability,
    estimate: state.customer.duration,
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
            newEvent: {
                start: null,
                end: null,
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({ type: AVAILABILITY_ACTIONS.FETCH });
    }

    componentDidUpdate(prevProps) {
        console.log('this.props.availabilityEvents', this.props.availabilityEvents);
        if(this.props.availabilityEvents !== prevProps.availabilityEvents) {
            let eventsArr = [];
            for (let event of this.props.availabilityEvents){
                eventsArr.push({ start: new Date(event.start), end: new Date(event.end) })
            }
            this.setState({
                events: [...eventsArr],
            });
        }
        console.log('this.state.events = ', this.state.events);
    }

    // moveEvent = ({ event, start, end }) => {
    //     const { events } = this.state;
    //     console.log('in moveevent');
    //     const idx = events.indexOf(event);
    //     console.log('idx:', idx);
    //     // let allDay = event.allDay
    
    //     // if (!event.allDay && droppedOnAllDaySlot) {
    //     //   allDay = true
    //     // } else if (event.allDay && !droppedOnAllDaySlot) {
    //     //   allDay = false
    //     // }
    
    //     const updatedEvent = { ...event, start, end}
    
    //     const nextEvents = [...events]
    //     nextEvents.splice(idx, 1, updatedEvent)
    
    //     this.setState({
    //       events: nextEvents,
    //     })
    //     console.log('this.state=', this.state)
    //     alert(`the event was dropped onto ${updatedEvent.start}`)
    // }

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
        if (this.props.userType === 'customer'){
            // console.log(slotInfo.start.getHours(), slotInfo.end.getHours());
            // console.log(this.props.estimate);
            let diff = slotInfo.end.getHours() - slotInfo.start.getHours();
            if (this.props.estimate === diff){
                // console.log('slotInfo:', slotInfo);
                this.setState({
                    newEvent: {start: new Date(slotInfo.start), end: new Date(slotInfo.end)},
                });
                this.setState({
                    events: [...this.state.events, this.state.newEvent]
                })
                this.dispatchAppt();
                return true;
            } else {
                alert(`The time you selected is not sufficient for your estimated service duration. Please select another time`);
            }
        } else if (this.props.userType === 'admin'){
            this.setState({
                newEvent: {start: new Date(slotInfo.start), end: new Date(slotInfo.end)},
            });
            this.setState({
                events: [...this.state.events, this.state.newEvent]
            })
            this.dispatchAvailability();
            return true;
        }
    }

    dispatchAppt() {
        this.props.dispatch({ type: CUSTOMER_ACTIONS.APPT, payload: this.state.newEvent });
    }

    dispatchAvailability() {
        this.props.dispatch({ type: AVAILABILITY_ACTIONS.STORE, payload: this.state.newEvent });
        this.setState({
            newEvent: { start: null, end: null }
        })
    }

    render() {
        // const { classes } = this.props;
        console.log(this.state);
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
                showMultiDayTimes
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