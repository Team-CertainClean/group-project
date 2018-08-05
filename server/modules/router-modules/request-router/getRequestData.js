const RequestTable = require('./RequestTable.class');
const pool = require('../../../modules/pool');

// THIS WILL BE DEPRECATED ONCE WE COMPLETE getRequestData below
function craftTable(){
    // Instantiate a new RequestTable object with methods and a status (unscheduled vs. scheduled)
    let table = new RequestTable();

    /* 
        Call getRequestAndContactData method to query database for all requests and corresponding 
        contact info of requests with matching status
    */
    table.getRequestAndContactData();

    /*
        Call getRequestRoomData method to query database for all rooms of corresponding requests
        and attach to request objects as an array, key: rooms.
    */
    table.getRequestRoomData();

    /*
        Call getAvailabilityData method to query database for all availability of corresponding requests
        and attach to request objects as an array, key: availability.
    */
    table.getAvailabilityData();

    /* 
        Return table object containing an array, key: requests, of request objects, each containing 
        information relevant to Request Tables on Admin facing GUIm including an array of rooms, key: rooms,
        and calendar objects, key: availability.
    */
    return table;
}

/*
This is the example provided by Mary for how to do these large queries.

`SELECT 
    task.*, 
	  CASE WHEN count(st) = 0 THEN ARRAY[]::json[] ELSE array_agg(st.subtask) END AS subtasks,
	  json_build_object('id', c.id, 'name', c.name) as category
  FROM task 
  JOIN category c ON task.category_id = c.id 
  LEFT OUTER JOIN (
      SELECT task_id, json_build_object('id', subtask.id, 'task_id', subtask.task_id, 'description', 	subtask.description, 'complete', subtask.complete) as subtask
      FROM subtask ORDER BY subtask.id
    ) st on st.task_id=task.id 
  GROUP BY task.id, c.id, c.name ORDER BY task.id;`
*/

/*
    Refactoring of above function and RequestTable class.

    This function should use 'json_build_object' and array_agg() to return an array of objects structured like:
[
    {
        request_info: {
            id: ?,
            start_time: ?,
            end_time: ?,
            est_duration: ?,
            status: ?
        },
        contact_info: {
            contact_id: ?,
            first_name: ?,
            last_name: ?,
            email: ?,
            phone_number: ?,
            address: ?
        }
        rooms: [?] -- This part is currently absent from the query below.  
    },
    etc.
]
*/
function getRequestData(){
    // See explanation in above multi-line comments
    return new Promise((resolve, reject)=>{
        try{
            const queryText = `
            SELECT 
	            json_build_object('request_id', request.id, 'start_time', request.start_time, 'end_time', request.end_time, 'est_duration', request.est_duration, 'status', request.status, 'cleanliness_score', request_room_junction.cleanliness_score) as request_info,
	            json_build_object('contact_id', contact.id, 'first_name', contact.first_name, 'last_name', contact.last_name, 'email', contact.email, 'phone_number', contact.phone_number, 'address', contact.location_address) as contact_info,
	            json_build_object('rooms', array_agg(room.*)) as room_info
            from request_room_junction
            JOIN request on request.id = request_room_junction.request_id
            JOIN room on room.id = request_room_junction.room_id
            JOIN contact on contact.request_id = request_room_junction.request_id
            GROUP BY request_room_junction.request_id, request.id, contact.id, request_room_junction.cleanliness_score 
            ORDER BY request_room_junction.request.id;`;
            const result = pool.query(queryText).then(result => result.rows);
            resolve(result);
        }catch(error){
            console.log('Error in getRequestData: ', error);
            reject();
        }
    });
}

module.exports = getRequestData;