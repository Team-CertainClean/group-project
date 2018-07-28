const RequestTable = require('./RequestTable.class');

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

module.exports = craftTable;