const estimateCalculator = (selectedRooms) => {
    let roomEstimatesArr = [];
    for (let room of selectedRooms) {
        switch (room.room_name) {
            case 'Kitchen' :
                switch (room.cleanliness_score){
                    case 1 : roomEstimatesArr.push(2.625);
                    break;
                    case 2 : roomEstimatesArr.push(2.4);
                    break;
                    case 3 : roomEstimatesArr.push(1.95);
                    break;
                    case 4 : roomEstimatesArr.push(1.725);
                    break;
                    case 5 : roomEstimatesArr.push(1.5);
                    break;
                }
        }
        switch (room.room_name) {
            case 'Bathroom' :
                switch (room.cleanliness_score){
                    case 1 : roomEstimatesArr.push(1.75);
                    break;
                    case 2 : roomEstimatesArr.push(1.6);
                    break;
                    case 3 : roomEstimatesArr.push(1.3);
                    break;
                    case 4 : roomEstimatesArr.push(1.15);
                    break;
                    case 5 : roomEstimatesArr.push(1);
                    break;
                }
        }
        switch (room.room_name) {
            case 'Bedroom' :
                switch (room.cleanliness_score){
                    case 1 : roomEstimatesArr.push(0.875);
                    break;
                    case 2 : roomEstimatesArr.push(0.8);
                    break;
                    case 3 : roomEstimatesArr.push(0.65);
                    break;
                    case 4 : roomEstimatesArr.push(0.575);
                    break;
                    case 5 : roomEstimatesArr.push(0.5);
                    break;
                }
        }
        switch (room.room_name) {
            case 'Living room' :
                switch (room.cleanliness_score){
                    case 1 : roomEstimatesArr.push(0.875);
                    break;
                    case 2 : roomEstimatesArr.push(0.8);
                    break;
                    case 3 : roomEstimatesArr.push(0.65);
                    break;
                    case 4 : roomEstimatesArr.push(0.575);
                    break;
                    case 5 : roomEstimatesArr.push(0.5);
                    break;
                }
        }
        switch (room.room_name) {
            case 'Dining room' :
                switch (room.cleanliness_score){
                    case 1 : roomEstimatesArr.push(0.875);
                    break;
                    case 2 : roomEstimatesArr.push(0.8);
                    break;
                    case 3 : roomEstimatesArr.push(0.65);
                    break;
                    case 4 : roomEstimatesArr.push(0.575);
                    break;
                    case 5 : roomEstimatesArr.push(0.5);
                    break;
                }
        }
    }
    console.log('roomEstimatesArr', roomEstimatesArr);
    console.log(Math.ceil(roomEstimatesArr.reduce(getSum)));
    return Math.ceil(roomEstimatesArr.reduce(getSum));
}

function getSum(total, num) {
    return total + num;
}

module.exports = estimateCalculator;