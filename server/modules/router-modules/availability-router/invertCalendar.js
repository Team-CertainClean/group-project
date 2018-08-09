/*
    invertCalendar module takes the admin provided availability objects 
    and inverts them so that the customer facing calendar will have open space where 
    the admin has placed a calendar object.
*/
async function invertCalendar(calendarArray){
    let unavailableArray = [];
    for(let i = 0; i < calendarArray.length; i++){
        let currentIndex = i;
        let previousIndex = currentIndex - 1;
        if(currentIndex === 0){
            unavailableArray[i] = await fillInCalendar(calendarArray[currentIndex], "undefined", currentIndex, calendarArray.length - 1);
        } else {
            result = await fillInCalendar(calendarArray[currentIndex], calendarArray[previousIndex], currentIndex, calendarArray.length - 1);
            if(Array.isArray(result)){
                for(let object of result){
                    unavailableArray[unavailableArray.length] = object;
                }
            } else {
                unavailableArray[unavailableArray.length] = result;
            }
        }
    }
    return unavailableArray;
}

function fillInCalendar(currentDate, prevDate, currentIndex, maxIndex){
    return new Promise((resolve, reject) => {
        if(prevDate === "undefined"){
            if(currentDate.start.getHours() > 5){
                if(currentDate.start.getMinutes() > 0){
                    let result = {};
                    result.end = new Date(currentDate.start);
                    result.start = new Date(currentDate.start);
                    result.start.setHours(5);
                    result.start.setMinutes(0);
                    resolve(result);
                } else {
                    resolve();
                }
            } else {
                resolve();
            }
        }
        if(currentIndex < maxIndex){
            console.log("Same day: ", currentDate.start.getHours(), currentDate.start.getMinutes());
            // If NOT the last object in the array passed to the function
               let result = {};
               result.end = new Date(currentDate.start);
               result.start = new Date(prevDate.end);
               resolve(result);
        } 
        else if(currentIndex == maxIndex){
            if(currentDate.end.getHours() < 19){
                let result = {};
                let endCalendar = {};
                result.start = new Date(prevDate.end);
                result.end = new Date(currentDate.start);
                endCalendar.start = new Date(currentDate.end);
                endCalendar.end = new Date(currentDate.end);
                endCalendar.end.setHours(19);
                endCalendar.end.setMinutes(0);
                resolve([result, endCalendar]);
            } else {
                let result = {};
                result.end = new Date(currentDate.start);
                result.start = new Date(prevDate.end);
                resolve(result);
            }
        }
    }
    );
}

testArray = [
    {
        start: new Date("2018-08-10 11:30:00-05Z"),
        end: new Date("2018-08-10 12:30:00-05Z")
    },
    {
        start: new Date("2018-08-11 12:00:00-05Z"),
        end: new Date("2018-08-11 14:30:00-05Z")
    }
];

module.exports = invertCalendar;