const express = require('express');
const router = express.Router();
const { getSeriesDetails, addSeries } = require('../controllers/contentController');

router.get('/:id', getSeriesDetails);
router.post('/', addSeries);

module.exports = router;
