const pool = require('../../pool');

function availabilityTransaction(body){
    return new Promise((resolve, reject) => {
        // creates an isolated pool connection to allow the transaction to occur
        
        console.log("In availability transaction: ", body);
        // anonymous async arrow function for carrying out asynchronous sql transaction queries
        ( async () => {
            console.log("TRANSACTION");
            const client = await pool.connect();
            try{
                // Initiates the transaction
                await client.query('BEGIN;');
                // Inserts rooms and their cleanliness scores into a junction table
                for(let date of body){
                    console.log('date inserted: ', date);
                    await client.query(`insert into availability (start, "end") values ($1, $2);`, [date.start, date.end]);
                }
                // Closes transaction
                await client.query('COMMIT;');
                // Resolves promise
                resolve(body);
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
        })();
    });
}

module.exports = availabilityTransaction;