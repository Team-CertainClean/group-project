
function availabilitySort(availability, requestsArray){
    let requests = requestsArray;
    for(let request of requests){
        request.availability = [];
        for(let object of availability){
            if(object.request_id === request.request_id){
                request.availability.push(object);
            }
        }
    }
    return requests;
}

module.exports = availabilitySort;