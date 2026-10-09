const express = require('express');
const router = express.Router();
const { getSubjects, getSubjectSeries, addSubject } = require('../controllers/contentController');

router.get('/', getSubjects);
router.post('/', addSubject);
router.get('/:slug/series', getSubjectSeries);

module.exports = router;
