const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res)=>{
    console.log('in POST of cleanerRouter');
    const cleaner = req.body;
    const queryText = 'insert into cleaner ("first_name", "last_name", "properly_account_id") values ($1, $2, $3);'; // Stretch, insert a media_key as well from AWS for accessing photos
    pool.query(queryText, [cleaner.first_name, cleaner.last_name, cleaner.properly_account_id])
        .then(result => res.sendStatus(201))
        .catch(error=>{
            console.log('Error handling POST for /api/cleaner: ', error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res)=>{
    const queryText = 'select * from cleaner;';
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('Error handling GET for /api/cleaner: ', error);
        });
});

router.delete('/:id', (req, res)=>{
    const queryText ='delete from cleaner where id = $1;';
    pool.query(queryText, [req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling DELETE in /api/cleaner: ', error);
            res.sendStatus(403);
        });
});

router.put('/:id', (req, res)=>{
    const cleaner = req.body;
    const queryText = 'update cleaner set first_name = $1, last_name = $2, properly_account_id = $3 where id = $4;';
    pool.query(queryText, [cleaner.first_name, cleaner.last_name, cleaner.properly_account_id, req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling PUT for /api/cleaner: ', error);
            res.sendStatus(403);
        });
});

module.exports = router;