/*
    invertCalendar module takes the admin provided availability objects 
    and inverts them so that the customer facing calendar will have open space where 
    the admin has placed a calendar object.
*/
async function invertCalendar(calendarArray){
    console.log("Invert Calendar: ", calendarArray);
    return new Promise( async (resolve) => {
        let unavailableArray = [];
        for(let i = 0; i < calendarArray.length; i++){
            let currentIndex = i;
            let previousIndex = currentIndex - 1;
            if(currentIndex === 0){
                unavailableArray[i] = await fillInCalendar(calendarArray[currentIndex], "undefined", currentIndex, calendarArray.length - 1);
                console.log("After fillin await, unavail: ", unavailableArray);
            } else {
                console.log('calendarArray in invertCalendar', calendarArray);
                result = await fillInCalendar(calendarArray[currentIndex], calendarArray[previousIndex], currentIndex, calendarArray.length - 1);
                if(Array.isArray(result)){
                    for(let object of result){
                        unavailableArray[unavailableArray.length] = object;
                    }
                } else {
                    unavailableArray[unavailableArray.length] = result;
                }
                console.log("After fillin await, unavail: ", unavailableArray);
            }
        }
        console.log("Completed Invert: ", unavailableArray);
        unavailableArray.shift();
        resolve(unavailableArray);
    });
}

function fillInCalendar(currentDate, prevDate, currentIndex, maxIndex){
    console.log("Fillin Calendar: ", currentDate, prevDate);
    return new Promise((resolve, reject) => {
        if(prevDate === "undefined"){
            console.log("Prev is undefined");
            console.log("currentDate start hours: ", currentDate.start.getHours());
            if(currentDate.start.getHours() >= 5){
                console.log("Got hours, minutes are: ", currentDate.start.getMinutes());
                if(currentDate.start.getMinutes() > 0){
                    let result = {};
                    result.end = new Date(currentDate.start);
                    result.start = new Date(currentDate.start);
                    result.start.setHours(5);
                    result.start.setMinutes(0);
                    console.log("First run: ", result);
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
            if(currentDate.end.getHours() < 23){
                let result = {};
                let endCalendar = {};
                result.start = new Date(prevDate.end);
                result.end = new Date(currentDate.start);
                endCalendar.start = new Date(currentDate.end);
                endCalendar.end = new Date(currentDate.end);
                endCalendar.end.setHours(23);
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

module.exports = invertCalendar;