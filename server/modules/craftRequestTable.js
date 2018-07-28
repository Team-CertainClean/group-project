const pool = require('./pool');

/*
Query for selecting rows from request table with contact info for UNSCHEDULED requests

select request.id as request_id, request.cleaning_type_id as cleaning_type, request.est_duration as duration, request.start_time as "start", request.end_time as "end", request.location_type_id as "location_id", contact.id as contact_id, contact.first_name, contact.last_name, contact.email, contact.phone_number, request.status as status from request 
join contact on request.id = contact.request_id where status = 0
group by request.id, contact.id;

Query for selecting rows from request table with contact info for SCHEDULED requests

select request.id as request_id, request.cleaning_type_id as cleaning_type, request.est_duration as duration, request.start_time as "start", request.end_time as "end", request.location_type_id as "location_id", contact.id as contact_id, contact.first_name, contact.last_name, contact.email, contact.phone_number, request.status as status from request 
join contact on request.id = contact.request_id where status = 1
group by request.id, contact.id;
*/


class RequestTable{
    constructor(status){
        this.status = status;
        this.rows = [];
    }

    getRequestAndContactData(){
        const queryText = `select request.id as request_id, request.cleaning_type_id as cleaning_type, request.est_duration as duration, request.start_time as "start", request.end_time as "end", request.location_type_id as "location_id", contact.id as contact_id, contact.first_name, contact.last_name, contact.email, contact.phone_number, request.status as status from request 
        join contact on request.id = contact.request_id where status = $1
        group by request.id, contact.id;`
        if(this.status === 'unscheduled'){
            pool.query(queryText, [0]).then(result => {
                this.rows = [...result.rows];
            }).catch(error => console.log('Error handling query for unscheduled requests: ', error));
        } else if(this.status === 'scheduled'){ 
            pool.query(queryText, [1]).then(result => {
                this.rows = [...result.rows];
            }).catch(error => console.log('Error handling query for scheduled requests: ', error));
        } else {
            console.log("Invalid status");
        }
    }

    getRequestRoomData(){
        const queryText = `select request.id as request_id, room.room_name as rooms from request_room_junction
        join request on request.id = request_room_junction.request_id
        join room on room.id = request_room_junction.room_id
        group by request.id, rooms;`
        pool.query(queryText).then(result => {
            this.attachRoomsToRequest(result.rows);
        }).catch(error => console.log('Error handling query for room data: ', error));
    }

    attachRoomsToRequest(rooms){
        
    }


}

