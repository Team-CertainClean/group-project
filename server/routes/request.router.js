const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const craftTable = require('../modules/craftTable');

/**
 * GET route template
 */
router.get('/unscheduled', (req, res) => {
    // 
    let result = craftTable();
    res.send(result);
});

router.get('/scheduled', (req, res) => {
    let result = craftTable();
    res.send(result);
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;