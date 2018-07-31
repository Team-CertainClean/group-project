const pool = require('../../pool');

async function requestTransaction(body){
    return new Promise((resolve, reject) => {
    try{
        await pool.query('BEGIN;');
        const req_id = await pool.query(`INSERT INTO request ("cleaning_type_id", "location_type_id", "est_duration") values ($1, $2, $3) returning id;`, [body.contactInfo.cleaning_type_id, body.location_type_id, body.est_duration]).then(result => result.rows[0].id);
        for(let room of body.rooms){
            await pool.query(`INSERT INTO request_room_junction ("room_id", "request_id", "cleanliness_score") values ($1, $2, $3);`, [room.room_id, req_id, room.cleanliness_score]);
        }
        for(let object of body.calendarObjects){
            await pool.query(`INSERT INTO request_availability_calendar_objects ("request_id", "start_time", "end_time") values ($1, $2, $3);`, [req_id, object.start, object.end]);
        }
        await pool.query(`INSERT INTO contact ("request_id", "first_name", "last_name", "email", "phone_number") values ($1, $2, $3, $4, $5);`, [req_id, body.contactInfo.first_name, body.contactInfo.last_name, body.contactInfo.email, body.contactInfo.phone_number]);
        await pool.query('COMMIT;');
    }catch(error){
        console.log('Error handling requestTransaction: ', error);
        pool.query('ROLLBACK;');
        reject();
    }finally{
        pool.release();
        resolve();
    }
    });
}

module.exports = requestTransaction;