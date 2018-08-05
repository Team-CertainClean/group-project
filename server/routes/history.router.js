/*
    This router serves as the method for closing requests

    Here we will pull contact information, and other relevant
        data from the "contact" table and drop it into our 
        "history" table to store.
*/
const router = require('express').Router();
const pool = require('../modules/pool');

router.post('/', (req, res)=>{

});

router.get('/', (req, res)=>{
    const queryText = 'select * from history;';
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error=>{
        console.log('Error handling GET for /api/history: ', error);
        res.sendStatus(404);
    });
});

module.exports = router;