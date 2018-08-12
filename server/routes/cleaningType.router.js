const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res)=>{
    const queryText = 'select * from cleaning_type;';
    pool.query(queryText)
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log('Error handling GET for /api/cleaningtype', error);
        });
});

router.post('/', (req, res)=>{
    const cleaning_type = req.body;
    console.log(`cleaning_type on cleaningType.router`, cleaning_type)
    const queryText = 'insert into cleaning_type ("cleaning_type") values ($1);';
    pool.query(queryText, [cleaning_type.cleaning_type])
        .then(result => res.sendStatus(201))
        .catch(error => {
            console.log('Error handling POST for /api/cleaningtype: ', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res)=>{
    const queryText = 'delete from cleaning_type where id = $1;';
    pool.query(queryText, [req.params.id])
        .then(result => res.sendStatus(200))
        .catch(error=>{
            console.log('Error handling DELETE for /api/cleaningtype ', error);
            res.sendStatus(403);
        });
});

router.put('/:id', (req, res)=> {
    const queryText = 'update cleaning_type set cleaning_type = $1 where id = $2;';
    pool.query(queryText, [req.body.cleaning_type, req.params.id]).then(result => res.sendStatus(200)).catch(error=>{
        console.log('Error handling PUT for /api/room/location: ', error);
        res.sendStatus(403);
    });
});

module.exports = router;