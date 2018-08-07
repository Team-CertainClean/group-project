const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const getRequestData = require('../modules/router-modules/request-router/getRequestData');
const requestTransaction = require('../modules/router-modules/request-router/requestTransaction');

/**
 * GET route template
 */
router.get('/requestTable', async (req, res) => {
    // Rename import, rename craftTable.js, and reassign module.exports in craftTable.js when getRequestData is completed
    // Replace with getRequestData from craftTable.js when completed and tested
    getRequestData()
        .then(result => {
            res.send(result)})
        .catch(error => {
            console.log('Error handling GET for /api/request/requestTable', error);
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
        .catch(error=>console.log('Error handling POST for /api/request: ', error));
});

module.exports = router;