const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const getRequestData = require('../modules/router-modules/request-router/getRequestData');
const requestTransaction = require('../modules/router-modules/request-router/requestTransaction');
const postHistoricalData = require('../modules/router-modules/request-router/postHistoricalData');
const deleteRequestData = require('../modules/router-modules/request-router/deleteRequestData');

/**
 * GET route template
 */
router.get('/requestTable', async (req, res) => {
    console.log(`req.query`, req.query.sort)
    // Rename import, rename craftTable.js, and reassign module.exports in craftTable.js when getRequestData is completed
    // Replace with getRequestData from craftTable.js when completed and tested
    getRequestData(req.query)
        .then(result => {
            res.send(result)})
        .catch(error => {
            console.log('Error handling GET for /api/request/requestTable', error);
            res.sendStatus(404);
        });
});

router.get('/commercialTable', (req, res)=> {
    getCommercialData(req.query)
        .then(result => res.send(result))
        .catch(error => {
            console.log('Error handling GET for /commercialTable: ', error);
            res.sendStatus(404);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // Module that performs SQL transaction to post customer provided information into the DB
    requestTransaction(req.body)
        .then(result => res.sendStatus(201))
        .catch(error=>console.log('Error handling POST for /api/request ', error));
});

// POST route to historical_contact_data
router.post('/historical', (req, res) => {
    // Module that performs SQL transaction to post completed customer information into the DB
    // console.log(`this is requestRouter`, req.body)
    postHistoricalData(req.body)
        .then(result => res.sendStatus(201))
        .catch(error=>console.log('Error handling POST for /api/request/historical ', error));
});

// POST route to historical_contact_data
router.delete('/:id', (req, res) => {
    // Module that performs SQL transaction to post completed customer information into the DB
    // console.log(`this is request.router req.body`, req.body)
    deleteRequestData(req.params.id)
        .then(result => res.sendStatus(201))
        .catch(error=>console.log('Error handling DELETE for /api/request/: ', error));
});

router.put('/:id', (req, res) => {
    console.log(`in UPDATE on request.router`, req.params.id);
    console.log(`in UPDATE on request.router - BODY`, req.body)
    let id = req.params.id;
    let status = req.body.newStatus;
    let location_type = req.body.payload.location_type;
    let est_duration = req.body.payload.est_duration;
    let queryText = `UPDATE request SET status = $1, location_type_id = $2, est_duration = $3 
    WHERE id = $4;`;
    pool.query(queryText, [status, location_type, est_duration, id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`error UPDATing request from DB`, error);
        res.sendStatus(500);
    });
  }); // end update device PUT
module.exports = router;