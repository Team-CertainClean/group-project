const pool = require('../../pool');

function genQuery(reqBody){
    let query = {text: '', array: []};
    let body = reqBody;
    body = sanitizeBody(body);
    let req_id = getRequestId(body);
    queryText = processBody(body, query, req_id);
    return queryText;
}

function getRequestId(body){
    let queryText = `INSERT INTO request ("cleaning_type_id", "location_type_id", "est_duration") values ($1, $2, $3) returning id;`;
    pool.query(queryText, [body.contactInfo.cleaning_type_id, body.location_type_id, body.est_duration]).then(result => result.rows[0].id).catch(error=>console.log('Error handling POST in getRequestId: ', error));
}

function processBody(body, query, req_id){
    for(let room of body.rooms){
        query.array[query.array.length - 1 ] = `INSERT INTO request_room_junction ("room_id", "request_id", "cleanliness_score") values (${room.room_id}, ${req_id}), ${room.cleanliness_score};`;
    }
    for(let object of body.calendarObjects){
        query.array[query.array.length -1 ] = `INSERT INTO request_availability_calendar_objects ("request_id", "start_time", "end_time") values (${req_id}, ${object.start}, ${object.end});`;
    }
    query.array[query.array.length - 1] = `INSERT INTO contact ("request_id", "first_name", "last_name", "email", "phone_number") values (${req_id}, ${body.contactInfo.first_name}, ${body.contactInfo.last_name}, ${body.contactInfo.email}, ${body.contactInfo.phone_number});`;
    query.text = query.array.join(' ');
    return query.text;
}  

// Recursive function for sanitizing user inputs in request body
function sanitizeBody(body){
    let sanBody = body;
    for(let object in sanBody){
        if(typeof(sanBody[object]) === 'string'){
            let sanString = sanBody[object];
            sanString = sanitizeString(sanString);
            sanBody[object] = sanString;
        }else if(Array.isArray(sanBody[object])) {
            for(let i = 0; i < sanBody[object].length; i++){
                if(typeof(sanBody[object][i]) === 'object'){
                    sanitizeBody(sanBody[object][i]);
                } else if(Array.isArray(sanBody[object][i])){
                    sanitizeBody(sanBody[object][i]);
                } else {
                    if(typeof(object[i]) === 'string'){
                        sanBody[object][i] = sanitizeString(sanBody[object][i]);
                    }
                }
            }
        } else if(typeof(sanBody[object]) == 'object'){
            sanitizeBody(sanBody[object]);
        }
    }
    return sanBody;
}

/*
    Modifies a string to remove any excess quotations marks, double and single.

    Currently removes the quotation mark directly from the string.

    ***Could be modified to simply escape excess quotation marks.***
*/
function sanitizeString(string){
    let sanString = string;
    for(let i = 0; i < sanString.length; i++){
        if(sanString[i] === '"'){
            let splitArray = sanString.split('');
            splitArray.splice(i, 1);
            sanString = splitArray.join('');
        } else if(sanString[i] === "'"){
            let splitArray = sanString.split('');
            splitArray.splice(i, 1);
            sanString = splitArray.join('');
        }
    }
    return sanString;
}


const testObject = {
    num: 0,
    string1: "'Hello",
    string2: 'Goodbye"',
    who: "Sally\'s",
    array: ['sup"', {string3: 'nestedObject"'}, 0],
    object: {nestedObject: { num: 10 }, string4: '"string'}
}

console.log(testObject);
sanTestObject = sanitizeBody(testObject);
console.log(testObject);

module.exports = genQuery;