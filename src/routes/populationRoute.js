const express = require('express');
const { getPopulation } = require('../controllers/populationController');

const router = express.Router();

router.get('/population', getPopulation);

module.exports = router;