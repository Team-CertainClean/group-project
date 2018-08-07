const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res)=>{
    console.log('in POST of availabilityRouter');
    const availability = req.body;
    const queryText = 'insert into availability (start, "end") values ($1, $2);'; // Stretch, insert a media_key as well from AWS for accessing photos
    pool.query(queryText, [availability.start, availability.end])
        .then(result => res.sendStatus(201))
        .catch(error=>{
            console.log('Error handling POST for /api/availability: ', error);
            res.sendStatus(500);
        });
});

router.get('/', (req, res)=>{
    const queryText = 'select id, start, "end" from availability;';
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('Error handling GET for /api/availability: ', error);
        });
});

router.delete('/:id', (req, res)=>{
    const queryText ='delete from availability where id = $1;';
    pool.query(queryText, [req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling DELETE in /api/availability: ', error);
            res.sendStatus(403);
        });
});

router.put('/:id', (req, res)=>{
    const availability = req.body;
    const queryText = 'update availability set start = $1, "end" = $2 where id = $3;';
    pool.query(queryText, [availability.start_time, availability.end_time, req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling PUT for /api/cleaner: ', error);
            res.sendStatus(403);
        });
});

module.exports = router;