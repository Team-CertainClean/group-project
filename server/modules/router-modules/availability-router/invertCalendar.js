/*
    invertCalendar module takes the admin provided availability objects 
    and inverts them so that the customer facing calendar will have open space where 
    the admin has placed a calendar object.
*/
const moment = require('moment');

function invertCalendar(calendarArray){
    let unavailableArray = [];
    for(let object in calendarArray){
        if(calendarArray.indexOf(object) === 0){
            fillInCalendar(moment(), object.start);
        } 
            fillInCalendar(object.end, calendarArray[calendarArray.indexOf(object)].start);
    }
}

module.exports = invertCalendar;