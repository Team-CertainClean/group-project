const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res)=>{
    const queryText =   `select 
                            room.id as id, 
                            room.room_name, 
                            room.duration_metric as metric, 
                            location_type.location_type as location_type 
                        from room
                        join location_type on room.location_type_id = location_type.id
                        group by room.id, location_type.location_type;`;
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