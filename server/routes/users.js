const express = require('express');
const router = express.Router();
const { getActivityHeatmap, getSubjectMastery, registerUser, loginUser, restartGame, deleteAccount } = require('../controllers/userController');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/restart', restartGame);
router.post('/delete', deleteAccount);
router.get('/activity', getActivityHeatmap);
router.get('/mastery', getSubjectMastery);

module.exports = router;
