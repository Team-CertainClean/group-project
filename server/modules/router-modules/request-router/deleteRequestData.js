const pool = require('../../pool');

function deleteRequestData(req){
    
    console.log(`this is req.body`, req.body)
    return new Promise((resolve, reject)=>{
        try{
            const queryText = `DELETE FROM request WHERE id = $1`;
            const result = pool.query(queryText, [req.body])
            .then(result => result.rows);
            resolve(result);
        }catch(error){
            console.log('Error in deleteRequestData: ', error);
            reject();
        }
    });
}

module.exports = deleteRequestData;