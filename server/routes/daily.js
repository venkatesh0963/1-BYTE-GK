const express = require('express');
const router = express.Router();
const { getTodayChallenge, submitAnswer } = require('../controllers/gameController');

router.get('/today', getTodayChallenge);
router.post('/answer', submitAnswer);

module.exports = router;
