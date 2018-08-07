const pool = require('../../pool');

function postHistoricalData(body){
    
    return new Promise((resolve, reject)=>{
        console.log(`this is body`, body)

        try{
            const queryText = `
            INSERT INTO historical_contact_data (first_name, last_name, email, phone_number)
            VALUES($1, $2, $3, $4);`;
            const result = pool.query(queryText, [body.contact_info.first_name, body.contact_info.last_name, body.contact_info.email, body.contact_info.phone_number ]).then(result => result.rows);
            resolve(result);
        }catch(error){
            console.log('Error in postHistoricalData: ', error);
            reject();
        }
    });
}

module.exports = postHistoricalData;