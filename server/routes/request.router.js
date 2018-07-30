const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const craftTable = require('../modules/router-modules/request-router/craftTable');
const genQuery = require('../modules/router-modules/request-router/genQuery');

/**
 * GET route template
 */
router.get('/requestTable', (req, res) => {
    // Uses craftTable module to retrieve Request information and package with all necessary data (rooms, availability)
    const result = craftTable();
    res.send(result);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const query = genQuery(req.body); 
    
});

module.exports = router;