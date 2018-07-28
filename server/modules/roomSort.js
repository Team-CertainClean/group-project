
function roomSort(rooms, requestArray){
    let requests = requestArray;
    for(let request of requests){
        request.rooms = [];
        for(let room of rooms){
            if(room.request_id === request.request_id){
                request.rooms.push(room);
            }
        }
    }
    return requests;
}

module.exports = roomSort;