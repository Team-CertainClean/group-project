const pool = require('../../pool');

function deleteRequestData(body){
    console.log(`this is deleteRequestData body`, body)
    return new Promise((resolve, reject)=>{
        try{
            const queryText = `DELETE FROM request WHERE id = $1`;
            const result = pool.query(queryText, [body])
            .then(result => result.rows);
            resolve(result);
        }catch(error){
            console.log('Error in deleteRequestData: ', error);
            reject();
        }
    });
}

module.exports = deleteRequestData;