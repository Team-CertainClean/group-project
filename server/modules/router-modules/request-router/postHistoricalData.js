const pool = require('../../pool');

function postHistoricalData(req){
    
    console.log(`this is req.body`, req.body)
    return new Promise((resolve, reject)=>{
        try{
            const queryText = `
            INSERT INTO historical_contact_data (first_name, last_name, email, phone_number)
            VALUES($1, $2, $3, $4);`;
            const result = pool.query(queryText, [req.body.first_name, req.body.last_name, req.body.email, req.body.phone_number ]).then(result => result.rows);
            resolve(result);
        }catch(error){
            console.log('Error in postHistoricalData: ', error);
            reject();
        }
    });
}

module.exports = postHistoricalData;