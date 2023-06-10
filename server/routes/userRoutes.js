const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// '/user/create'
router.put('/create', userController.createUser);
// '/user/verify'
router.post('/verify', userController.verifyUser);

module.exports = router;
