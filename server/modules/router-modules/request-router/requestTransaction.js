const pool = require('../../pool');

async function requestTransaction(body){
    return new Promise((resolve, reject) => {
        // creates an isolated pool connection to allow the transaction to occur
        const client = pool.connect();
        try{
            // Initiates the transaction
            await client.query('BEGIN;');
            // Inserts the request data and returns the id for use in other queries
            const req_id = await client.query(`INSERT INTO request ("cleaning_type_id", "location_type_id", "start_time", "end_time", "est_duration") values ($1, $2, $3, $4, $5) returning id;`, [body.contactInfo.cleaning_type_id, body.location_type_id, body.calendar.start, body.calendar.end, body.est_duration]).then(result => result.rows[0].id);
            // Inserts rooms and their cleanliness scores into a junction table
            for(let room of body.rooms){
                await client.query(`INSERT INTO request_room_junction ("room_id", "request_id", "cleanliness_score") values ($1, $2, $3);`, [room.room_id, req_id, room.cleanliness_score]);
            }
            // Inserts the contact information
            await client.query(`INSERT INTO contact ("request_id", "first_name", "last_name", "email", "phone_number", "location_address") values ($1, $2, $3, $4, $5, $6);`, [req_id, body.contactInfo.first_name, body.contactInfo.last_name, body.contactInfo.email, body.contactInfo.phone_number, body.contactInfo.location_address]);
            // Closes transaction
            await client.query('COMMIT;');
            // Resolves promise
            resolve();
        }catch(error){
            console.log('Error handling requestTransaction: ', error);
            // Rolls back sql inserts if an error occurs to preserve integrity of data in DB
            pool.query('ROLLBACK;');
            // Rejects the promise
            reject();
        }finally{
            // Releases isolated pool connection
            client.release();
        }
    });
}

module.exports = requestTransaction;