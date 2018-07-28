const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const craftTable = require('../modules/router-modules/request-router/craftTable');

/**
 * GET route template
 */
router.get('/requestTable', (req, res) => {
    // Uses craftTable module to retrieve Request information and package with all necessary data (rooms, availability)
    let result = craftTable();
    res.send(result);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;