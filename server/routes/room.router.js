const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res)=>{
    const queryText =   `select 
                            room.id as id, 
                            room.room_name, 
                            room.cleanliness_one_metric,
                            room.cleanliness_two_metric,
                            room.cleanliness_three_metric,
                            room.cleanliness_four_metric,
                            room.cleanliness_five_metric, 
                            location_type.location_type as location_type,
                            room.location_type_id as location_type_id
                        from room
                        join location_type on room.location_type_id = location_type.id
                        group by room.id, location_type.location_type
                        order by room.id;`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows)})
        .catch(error=>{
            console.log("Error handling GET for rooms: ", error)
            res.sendStatus(404);
        });
});
    
router.post('/', (req, res)=>{
    const room = req.body;
    const metrics = room.cleanliness_metrics;
    console.log(room);
    const queryText = 'insert into room ("room_name", "location_type_id", "cleanliness_one_metric", "cleanliness_two_metric", "cleanliness_three_metric", "cleanliness_four_metric", "cleanliness_five_metric") values ($1, $2, $3, $4, $5, $6, $7);';
    pool.query(queryText, [room.room_name, room.location_type_id, metrics.one, metrics.two, metrics.three, metrics.four, metrics.five])
        .then(result => res.sendStatus(201))
        .catch(error => {
            console.log('Error handling POST for /api/room: ', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res)=>{
    const queryText = 'delete from room where id = $1;';
    pool.query(queryText, [req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling DELETE for /api/room: ', error);
            res.sendStatus(403);
        });
});

router.put('/:id', (req, res)=>{
    const room = req.body;
    const queryText = 'update room set room_name = $1, location_type_id = $2, cleanliness_one_metric = $3, cleanliness_two_metric = $4, cleanliness_three_metric = $5, cleanliness_four_metric = $6, cleanliness_five_metric = $7 where id = $8;';
    pool.query(queryText, [room.room_name, room.location_type_id, room.cleanliness_one_metric, room.cleanliness_two_metric, room.cleanliness_three_metric, room.cleanliness_four_metric, room.cleanliness_five_metric, req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling PUT for /api/room: ', error);
            res.sendStatus(403);
        });
});

router.get('/location', (req, res)=>{
    const queryText = 'select * from location_type;';
    pool.query(queryText)
        .then(result=>res.send(result.rows))
        .catch(error=>{
            console.log('Error handling GET for /api/room/location: ', error);
            res.sendStatus(404);
        });
});

router.post('/location', (req, res)=>{
    const location = req.body;
    const queryText = 'insert into location_type ("location_type") values ($1);';
    pool.query(queryText, [location.location_type])
        .then(result => res.sendStatus(201))
        .catch(error => {
            console.log('Error handling POST for /api/room/location: ', error);
            res.sendStatus(500);
        });
});

router.delete('/location/:id', (req, res)=>{
    const queryText = 'delete from location_type where id = $1;';
    pool.query(queryText, [req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling DELETE for /api/room/location: ', error);
            res.sendStatus(403);
        });
});

router.put('/location/:id', (req, res)=> {
    const queryText = 'update location_type set location_type = $1 where id = $2;';
    pool.query(queryText, [req.body.location_type, req.params.id]).then(result => res.sendStatus(200)).catch(error=>{
        console.log('Error handling PUT for /api/room/location: ', error);
        res.sendStatus(403);
    });
});

module.exports = router;