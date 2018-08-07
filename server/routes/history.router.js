/*
    This router serves as the method for closing requests

    Here we will pull contact information, and other relevant
        data from the "contact" table and drop it into our 
        "history" table to store.
*/
const router = require('express').Router();
const pool = require('../modules/pool');

router.post('/', (req, res)=>{
    const contact = req.body;
    const queryText = 'insert into historical_contact_data ("first_name", "last_name", "email", "phone_number") values ($1, $2, $3, $4);';
    pool.query(queryText, [contact.first_name, contact.last_name, contact.email, contact.phone_number])
        .then(result => res.send(result.rows)).catch(error => {
            console.log('Error handling POST for /api/history: ', error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res)=>{
    const queryText = 'select * from historical_contact_data;';
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error=>{
        console.log('Error handling GET for /api/history: ', error);
        res.sendStatus(404);
    });
});

module.exports = router;