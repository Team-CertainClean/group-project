const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res)=>{
    const queryText = 'select * from rooms;';
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error=>console.log("Error handling GET for rooms: ", error));
});

router.get('/location', (req, res)=>{
    const queryText = 'select * from location_type;';
    pool.query(queryText)
        .then(result=>res.send(result.rows))
        .catch(error=>{
            console.log('Error handling GET for /api/room/location: ', error);
    });
});

module.exports = router;