// Requires
const pool = require('../../pool');
const roomSort = require('./roomSort');
const availabilitySort = require('./availabilitySort');

/* 
    RequestTable class with methods retrieving information 
    relevant to Request Table of Admin Facing GUI 
*/
class RequestTable{
    constructor(){
        this.requests = [];
    }

    // Get Requests
    getRequestAndContactData(){
        // Retrieve request table and contact table information
        const queryText = `select request.id as request_id, request.cleaning_type_id as cleaning_type, request.est_duration as duration, request.start_time as "start", request.end_time as "end", request.location_type_id as "location_id", contact.id as contact_id, contact.first_name, contact.last_name, contact.email, contact.phone_number, request.status as status from request 
        join contact on request.id = contact.request_id where status = $1
        group by request.id, contact.id;`

        pool.query(queryText, [0]).then(result => {
            // Set class property "requests" equal to result from database query
            this.requests = result.rows;
        }).catch(error => console.log('Error handling query for unscheduled requests: ', error));
    }

    // Get Room Data
    getRequestRoomData(){
        // Retrieve Rooms from database
        const queryText = `select request.id as request_id, room.room_name as rooms from request_room_junction
        join request on request.id = request_room_junction.request_id
        join room on room.id = request_room_junction.room_id
        group by request.id, rooms;`
        pool.query(queryText).then(result => {
            // Attach rooms to appropriate request based on request_id
            this.attachRoomsToRequest(result.rows);
        }).catch(error => console.log('Error handling query for room data: ', error));
    }

    // Attach Room Data to appropriate Request
    attachRoomsToRequest(rooms){
        this.requests = roomSort(rooms, this.requests);
    }

    // Get Calendar Data
    getAvailabilityData(){
        // Retrieve calendar objects from Availability table
        const queryText = `select * from request_availability_calendar_objects`;
        pool.query(queryText).then(result => {
            // Attach to appropriate request based on request_id
            this.attachAvailabilityToRequest(result.rows);
        }).catch(error => console.log('Error handling query for availability calendar data: ', error));
    }

    // Attach Calendar Data to appropriate Request
    attachAvailabilityToRequest(availability){
        this.requests = availabilitySort(availability, this.requests);
    }

}

module.exports = RequestTable;